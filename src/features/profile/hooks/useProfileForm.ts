import {useCallback, useState} from 'react';
import {phoneCountries} from '../data/phoneCountries';
import {profileStrings} from '../strings';

export type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
};

export type ProfileFieldErrors = Partial<Record<keyof ProfileFormValues, string>>;

type UseProfileFormOptions = {
  initialName: string;
  onSave: (values: ProfileFormValues) => Promise<void>;
};

export function useProfileForm({initialName, onSave}: UseProfileFormOptions) {
  const [values, setValues] = useState<ProfileFormValues>({
    name: initialName,
    email: '',
    phone: '',
    countryCode: '+374',
  });
  const [originalValues, setOriginalValues] = useState(values);
  const [errors, setErrors] = useState<ProfileFieldErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const hydrate = useCallback((nextValues: ProfileFormValues) => {
    setValues(nextValues);
    setOriginalValues(nextValues);
    setIsEditing(false);
    setErrors({});
  }, []);

  const setField = <K extends keyof ProfileFormValues>(field: K, value: ProfileFormValues[K]) => {
    setValues(current => ({...current, [field]: value}));
    setErrors(current => ({...current, [field]: undefined}));
    setSubmitError('');
  };

  const beginEditing = () => {
    setIsEditing(true);
    setSubmitError('');
  };

  const cancelEditing = () => {
    setValues(originalValues);
    setErrors({});
    setSubmitError('');
    setIsEditing(false);
  };

  const save = async (): Promise<boolean> => {
    const normalized: ProfileFormValues = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.replace(/\D/g, ''),
    };
    const nextErrors: ProfileFieldErrors = {};
    const country = phoneCountries.find(item => item.dialCode === normalized.countryCode);

    if (!normalized.name) {
      nextErrors.name = profileStrings.personalInfo.requiredName;
    }
    if (!normalized.email) {
      nextErrors.email = profileStrings.personalInfo.requiredEmail;
    } else if (!/^\S+@\S+\.\S+$/.test(normalized.email)) {
      nextErrors.email = profileStrings.personalInfo.invalidEmail;
    }
    if (!normalized.phone) {
      nextErrors.phone = profileStrings.personalInfo.requiredPhone;
    } else if (!country || normalized.phone.length !== country.nationalDigits) {
      nextErrors.phone = profileStrings.personalInfo.invalidPhone;
    }

    setErrors(nextErrors);
    setSubmitError('');
    if (Object.keys(nextErrors).length) {
      return false;
    }

    setIsSaving(true);
    try {
      await onSave(normalized);
      setValues(normalized);
      setOriginalValues(normalized);
      setIsEditing(false);
      return true;
    } catch {
      setSubmitError(profileStrings.personalInfo.saveError);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    values,
    errors,
    submitError,
    isEditing,
    isSaving,
    hydrate,
    setField,
    beginEditing,
    cancelEditing,
    save,
  };
}