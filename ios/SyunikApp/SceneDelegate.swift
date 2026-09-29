import UIKit
import React

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    print("SceneDelegate: willConnectTo called")

    guard let windowScene = scene as? UIWindowScene else {
      print("SceneDelegate: scene is not a UIWindowScene")
      return
    }

    guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else {
      print("SceneDelegate: could not get AppDelegate")
      return
    }

    guard let factory = appDelegate.reactNativeFactory else {
      print("SceneDelegate: reactNativeFactory is nil")
      return
    }

    let window = UIWindow(windowScene: windowScene)
    self.window = window

    // React Native still reads delegate.window in a few places
    appDelegate.window = window

    factory.startReactNative(
      withModuleName: "SyunikApp",
      in: window,
      launchOptions: nil
    )

    window.makeKeyAndVisible()
    print("SceneDelegate: React Native started")
  }
}