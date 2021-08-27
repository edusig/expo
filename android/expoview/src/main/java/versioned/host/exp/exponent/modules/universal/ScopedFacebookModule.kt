package versioned.host.exp.exponent.modules.universal

import android.content.Context
import com.facebook.FacebookSdk
import expo.modules.core.Promise
import expo.modules.core.arguments.ReadableArguments
import expo.modules.core.interfaces.LifecycleEventListener
import expo.modules.facebook.FacebookModule

class ScopedFacebookModule(context: Context) : FacebookModule(context), LifecycleEventListener {
  private var isInitialized = false

  override fun onHostResume() {
    if (mAppId != null) {
      FacebookSdk.setApplicationId(mAppId)
    }
    if (mAppName != null) {
      FacebookSdk.setApplicationName(mAppName)
    }
  }

  override fun initializeAsync(options: ReadableArguments, promise: Promise) {
    isInitialized = true
    super.initializeAsync(options, promise)
  }

  override fun logInWithReadPermissionsAsync(config: ReadableArguments, promise: Promise) {
    if (!isInitialized) {
      promise.reject(ERR_FACEBOOK_UNINITIALIZED, "Facebook SDK has not been initialized yet.")
    }
    super.logInWithReadPermissionsAsync(config, promise)
  }

  override fun getAuthenticationCredentialAsync(promise: Promise) {
    if (!isInitialized) {
      promise.reject(ERR_FACEBOOK_UNINITIALIZED, "Facebook SDK has not been initialized yet.")
    }
    super.getAuthenticationCredentialAsync(promise)
  }

  override fun logOutAsync(promise: Promise) {
    if (!isInitialized) {
      promise.reject(ERR_FACEBOOK_UNINITIALIZED, "Facebook SDK has not been initialized yet.")
    }
    super.logOutAsync(promise)
  }

  override fun onHostPause() {
    FacebookSdk.setApplicationId(null)
    FacebookSdk.setApplicationName(null)
  }

  override fun onHostDestroy() {
    // do nothing
  }

  companion object {
    private const val ERR_FACEBOOK_UNINITIALIZED = "ERR_FACEBOOK_UNINITIALIZED"
  }
}
