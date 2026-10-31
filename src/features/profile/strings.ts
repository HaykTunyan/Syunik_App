import type {ProfileLanguage} from './services/profileStorage';

const englishProfileStrings = {
  traveler: 'Traveler',
  profileSubtitle: 'Your Syunik travel profile',
  changePhoto: 'Change profile photo',
  photoLabel: 'Profile photo',
  photoUpdated: 'Profile photo updated.',
  photoSelectError: 'Could not select a profile photo.',
  photoSaveError: 'Could not save the profile photo.',
  description: 'Keep your contact details and the places you love in one place.',
  stats: {visited: 'Visited', favorites: 'Favorites', badges: 'Badges'},
  personalInfo: {
    title: 'Personal information',
    name: 'Name',
    email: 'Email',
    phone: 'Phone number',
    namePlaceholder: 'Enter your name',
    emailPlaceholder: 'you@example.com',
    phonePlaceholder: 'Phone number',
    edit: 'Edit profile',
    save: 'Save changes',
    cancel: 'Cancel',
    saving: 'Saving...',
    requiredName: 'Enter your name.',
    requiredEmail: 'Enter your email address.',
    invalidEmail: 'Enter a valid email address.',
    requiredPhone: 'Enter your phone number.',
    invalidPhone: 'Enter a valid phone number.',
    saveError: 'Could not save your profile. Please try again.',
    saveSuccess: 'Profile details saved.',
    selectCountry: 'Select country code',
  },
  favorites: {
    title: 'Favorite places',
    description: 'Save places you want to visit.',
    search: 'Search places',
    emptyTitle: 'No favorites yet',
    emptyDescription: 'Save a place to keep it close.',
    browse: 'Browse places',
    noMatches: 'No matching places.',
    added: 'Favorite place saved.',
    removed: 'Favorite place removed.',
    addError: 'Could not save favorite place.',
    removeError: 'Could not update favorite places.',
    selectHint: 'Choose a place from the suggestions.',
    duplicate: 'That place is already a favorite.',
    remove: 'Remove favorite',
    exploreAdded: 'Added to favorites.',
    exploreRemoved: 'Removed from favorites.',
    exploreSaveError: 'Could not update favorites. Please try again.',
    addFromExplore: 'Add to favorites',
    removeFromExplore: 'Remove from favorites',
  },
  visits: {
    title: 'Visiting history',
    description: 'Keep a record of the places you have visited.',
    search: 'Search places',
    noMatches: 'No matching places.',
    emptyTitle: 'Your next visit starts here',
    emptyDescription: 'Add a place and the date you visited.',
    addFirst: 'Add a visit',
    chooseDate: 'Choose visit date',
    delete: 'Delete visit',
    confirmDelete: 'Remove this visit from your history?',
    deleted: 'Visit removed.',
    added: 'Visit saved to your history.',
    addError: 'Could not save visiting history.',
    selectHint: 'Choose a place from the suggestions first.',
    removeError: 'Could not update visiting history.',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    locationAccess: 'Location access',
    shareLocation: 'Share my current location',
    shareLocationTitle: 'My current location',
    locationPermissionRequired: 'Allow location access to share your current location.',
    locationPermissionError: 'Could not request location access. Please try again.',
    locationUnavailable: 'Could not get your current location. Please try again.',
    locationServiceUnavailable: 'Location sharing is unavailable. Install native dependencies and rebuild the app.',
    locationShareError: 'Could not share your current location. Please try again.',
    logout: 'Log out',
    deleteAccount: 'Delete account',
    deleteTitle: 'Delete account?',
    deleteMessage: 'This action cannot be undone.',
    confirmDelete: 'Delete',
    cancel: 'Cancel',
    logoutUnavailable: 'There is no signed-in account to log out.',
    deleteUnavailable: 'Account deletion is unavailable until an account service is connected.',
    saveError: 'Could not save settings. Please try again.',
    notificationsPermissionRequired: 'Allow notifications in iOS Settings to turn on Firebase notifications.',
    notificationsSaveError: 'Could not update Firebase notifications. Please try again.',
  },
  common: {
    retry: 'Retry',
    loadError: 'Could not load profile details.',
    loading: 'Loading profile...',
    dismiss: 'Dismiss',
  },
} as const;

type ProfileStrings = typeof englishProfileStrings;
type TranslationMap = Record<string, string>;

const profileTranslations: Record<'HY' | 'RU', TranslationMap> = {
  HY: {
    Traveler: 'Ճանապարհորդ', 'Your Syunik travel profile': 'Ձեր ճանապարհորդական պրոֆիլը Սյունիքում', 'Change profile photo': 'Փոխել պրոֆիլի լուսանկարը', 'Profile photo': 'Պրոֆիլի լուսանկար', 'Profile photo updated.': 'Պրոֆիլի լուսանկարը թարմացվեց։', 'Could not select a profile photo.': 'Չհաջողվեց ընտրել պրոֆիլի լուսանկար։', 'Could not save the profile photo.': 'Չհաջողվեց պահպանել պրոֆիլի լուսանկարը։', 'Keep your contact details and the places you love in one place.': 'Պահեք Ձեր կոնտակտային տվյալներն ու սիրելի վայրերը մեկ տեղում։', Visited: 'Այցելված', Favorites: 'Սիրելիներ', Badges: 'Նշաններ',
    'Personal information': 'Անձնական տվյալներ', Name: 'Անուն', Email: 'Էլ․ փոստ', 'Phone number': 'Հեռախոսահամար', 'Enter your name': 'Մուտքագրեք Ձեր անունը', 'Edit profile': 'Խմբագրել պրոֆիլը', 'Save changes': 'Պահպանել փոփոխությունները', Cancel: 'Չեղարկել', 'Saving...': 'Պահպանում...', 'Enter your name.': 'Մուտքագրեք Ձեր անունը։', 'Enter your email address.': 'Մուտքագրեք Ձեր էլ․ փոստի հասցեն։', 'Enter a valid email address.': 'Մուտքագրեք վավեր էլ․ փոստի հասցե։', 'Enter your phone number.': 'Մուտքագրեք Ձեր հեռախոսահամարը։', 'Enter a valid phone number.': 'Մուտքագրեք վավեր հեռախոսահամար։', 'Could not save your profile. Please try again.': 'Չհաջողվեց պահպանել պրոֆիլը։ Փորձեք կրկին։', 'Profile details saved.': 'Պրոֆիլի տվյալները պահպանվեցին։', 'Select country code': 'Ընտրեք երկրի կոդը',
    'Favorite places': 'Սիրելի վայրեր', 'Save places you want to visit.': 'Պահեք այն վայրերը, որոնք ցանկանում եք այցելել։', 'Search places': 'Որոնել վայրեր', 'No favorites yet': 'Դեռ սիրելի վայրեր չկան', 'Save a place to keep it close.': 'Պահեք վայրը՝ այն հեշտ հասանելի պահելու համար։', 'Browse places': 'Դիտել վայրերը', 'No matching places.': 'Համապատասխան վայրեր չեն գտնվել։', 'Favorite place saved.': 'Վայրը ավելացվեց սիրելիների ցանկում։', 'Favorite place removed.': 'Վայրը հեռացվեց սիրելիներից։', 'Could not save favorite place.': 'Չհաջողվեց պահպանել սիրելի վայրը։', 'Could not update favorite places.': 'Չհաջողվեց թարմացնել սիրելի վայրերը։', 'Choose a place from the suggestions.': 'Ընտրեք վայր առաջարկներից։', 'That place is already a favorite.': 'Այդ վայրն արդեն սիրելիների ցանկում է։', 'Remove favorite': 'Հեռացնել սիրելիներից', 'Added to favorites.': 'Ավելացվեց սիրելիների ցանկում։', 'Removed from favorites.': 'Հեռացվեց սիրելիների ցանկից։', 'Could not update favorites. Please try again.': 'Չհաջողվեց թարմացնել սիրելիները։ Փորձեք կրկին։', 'Add to favorites': 'Ավելացնել սիրելիներին', 'Remove from favorites': 'Հեռացնել սիրելիներից',
    'Visiting history': 'Այցելությունների պատմություն', 'Keep a record of the places you have visited.': 'Պահեք Ձեր այցելած վայրերի պատմությունը։', 'Your next visit starts here': 'Ձեր հաջորդ այցը սկսվում է այստեղից', 'Add a place and the date you visited.': 'Ավելացրեք վայրն ու այցելության ամսաթիվը։', 'Add a visit': 'Ավելացնել այց', 'Choose visit date': 'Ընտրեք այցելության ամսաթիվը', 'Delete visit': 'Ջնջել այցը', 'Remove this visit from your history?': 'Հեռացնե՞լ այս այցը պատմությունից։', 'Visit removed.': 'Այցը հեռացվեց։', 'Visit saved to your history.': 'Այցը պահպանվեց պատմությունում։', 'Could not save visiting history.': 'Չհաջողվեց պահպանել այցելությունների պատմությունը։', 'Choose a place from the suggestions first.': 'Սկզբում ընտրեք վայր առաջարկներից։', 'Could not update visiting history.': 'Չհաջողվեց թարմացնել այցելությունների պատմությունը։',
    Settings: 'Կարգավորումներ', Language: 'Լեզու', Notifications: 'Ծանուցումներ', 'Location access': 'Տեղադրության հասանելիություն', 'Share my current location': 'Կիսվել իմ գտնվելու վայրով', 'My current location': 'Իմ գտնվելու վայրը', 'Allow location access to share your current location.': 'Թույլատրեք տեղադրության հասանելիությունը՝ գտնվելու վայրը կիսելու համար։', 'Could not request location access. Please try again.': 'Չհաջողվեց խնդրել տեղադրության հասանելիություն։ Փորձեք կրկին։', 'Could not get your current location. Please try again.': 'Չհաջողվեց ստանալ Ձեր գտնվելու վայրը։ Փորձեք կրկին։', 'Delete account': 'Ջնջել հաշիվը', 'Delete account?': 'Ջնջե՞լ հաշիվը։', 'This action cannot be undone.': 'Այս գործողությունը հնարավոր չէ չեղարկել։', Delete: 'Ջնջել', 'Could not save settings. Please try again.': 'Չհաջողվեց պահպանել կարգավորումները։ Փորձեք կրկին։', Retry: 'Կրկին փորձել', 'Could not load profile details.': 'Չհաջողվեց բեռնել պրոֆիլի տվյալները։', 'Loading profile...': 'Պրոֆիլը բեռնվում է...', Dismiss: 'Փակել',
  },
  RU: {
    Traveler: 'Путешественник', 'Your Syunik travel profile': 'Ваш профиль путешественника по Сюнику', 'Change profile photo': 'Изменить фото профиля', 'Profile photo': 'Фото профиля', 'Profile photo updated.': 'Фото профиля обновлено.', 'Could not select a profile photo.': 'Не удалось выбрать фото профиля.', 'Could not save the profile photo.': 'Не удалось сохранить фото профиля.', 'Keep your contact details and the places you love in one place.': 'Храните контактные данные и любимые места в одном месте.', Visited: 'Посещено', Favorites: 'Избранное', Badges: 'Значки',
    'Personal information': 'Личная информация', Name: 'Имя', Email: 'Эл. почта', 'Phone number': 'Номер телефона', 'Enter your name': 'Введите имя', 'Edit profile': 'Изменить профиль', 'Save changes': 'Сохранить изменения', Cancel: 'Отмена', 'Saving...': 'Сохранение...', 'Enter your name.': 'Введите имя.', 'Enter your email address.': 'Введите адрес эл. почты.', 'Enter a valid email address.': 'Введите действительный адрес эл. почты.', 'Enter your phone number.': 'Введите номер телефона.', 'Enter a valid phone number.': 'Введите действительный номер телефона.', 'Could not save your profile. Please try again.': 'Не удалось сохранить профиль. Попробуйте ещё раз.', 'Profile details saved.': 'Данные профиля сохранены.', 'Select country code': 'Выберите код страны',
    'Favorite places': 'Избранные места', 'Save places you want to visit.': 'Сохраняйте места, которые хотите посетить.', 'Search places': 'Поиск мест', 'No favorites yet': 'Избранных мест пока нет', 'Save a place to keep it close.': 'Сохраните место, чтобы оно было под рукой.', 'Browse places': 'Обзор мест', 'No matching places.': 'Подходящих мест не найдено.', 'Favorite place saved.': 'Место добавлено в избранное.', 'Favorite place removed.': 'Место удалено из избранного.', 'Could not save favorite place.': 'Не удалось сохранить место.', 'Could not update favorite places.': 'Не удалось обновить избранные места.', 'Choose a place from the suggestions.': 'Выберите место из предложений.', 'That place is already a favorite.': 'Это место уже в избранном.', 'Remove favorite': 'Удалить из избранного', 'Added to favorites.': 'Добавлено в избранное.', 'Removed from favorites.': 'Удалено из избранного.', 'Could not update favorites. Please try again.': 'Не удалось обновить избранное. Попробуйте ещё раз.', 'Add to favorites': 'Добавить в избранное', 'Remove from favorites': 'Удалить из избранного',
    'Visiting history': 'История посещений', 'Keep a record of the places you have visited.': 'Сохраняйте историю посещённых мест.', 'Your next visit starts here': 'Следующее посещение начинается здесь', 'Add a place and the date you visited.': 'Добавьте место и дату посещения.', 'Add a visit': 'Добавить посещение', 'Choose visit date': 'Выберите дату посещения', 'Delete visit': 'Удалить посещение', 'Remove this visit from your history?': 'Удалить это посещение из истории?', 'Visit removed.': 'Посещение удалено.', 'Visit saved to your history.': 'Посещение сохранено в истории.', 'Could not save visiting history.': 'Не удалось сохранить историю посещений.', 'Choose a place from the suggestions first.': 'Сначала выберите место из предложений.', 'Could not update visiting history.': 'Не удалось обновить историю посещений.',
    Settings: 'Настройки', Language: 'Язык', Notifications: 'Уведомления', 'Location access': 'Доступ к местоположению', 'Share my current location': 'Поделиться моим местоположением', 'My current location': 'Моё местоположение', 'Allow location access to share your current location.': 'Разрешите доступ к местоположению, чтобы поделиться им.', 'Could not request location access. Please try again.': 'Не удалось запросить доступ к местоположению. Попробуйте ещё раз.', 'Could not get your current location. Please try again.': 'Не удалось получить местоположение. Попробуйте ещё раз.', 'Delete account': 'Удалить аккаунт', 'Delete account?': 'Удалить аккаунт?', 'This action cannot be undone.': 'Это действие нельзя отменить.', Delete: 'Удалить', 'Could not save settings. Please try again.': 'Не удалось сохранить настройки. Попробуйте ещё раз.', Retry: 'Повторить', 'Could not load profile details.': 'Не удалось загрузить данные профиля.', 'Loading profile...': 'Загрузка профиля...', Dismiss: 'Закрыть',
  },
};

function localize(value: unknown, map: TranslationMap): unknown {
  if (typeof value === 'string') return map[value] ?? value;
  if (Array.isArray(value)) return value.map(item => localize(item, map));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, map)]));
  }
  return value;
}

export let profileStrings: ProfileStrings = englishProfileStrings;

export function setProfileStringsLanguage(language: ProfileLanguage) {
  profileStrings = language === 'EN'
    ? englishProfileStrings
    : localize(englishProfileStrings, profileTranslations[language]) as ProfileStrings;
}
