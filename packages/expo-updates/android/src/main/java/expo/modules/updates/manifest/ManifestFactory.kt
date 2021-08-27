package expo.modules.updates.manifest

import expo.modules.updates.UpdatesConfiguration
import expo.modules.manifests.core.BareRawManifest
import expo.modules.manifests.core.LegacyRawManifest
import expo.modules.manifests.core.NewRawManifest
import expo.modules.manifests.core.RawManifest
import org.json.JSONException
import org.json.JSONObject

object ManifestFactory {
  private val TAG = ManifestFactory::class.java.simpleName

  @Throws(Exception::class)
  fun getManifest(manifestJson: JSONObject, httpResponse: ManifestResponse, configuration: UpdatesConfiguration?): UpdateManifest {
    val expoProtocolVersion = httpResponse.header("expo-protocol-version", null)
    return when {
      expoProtocolVersion == null -> {
        LegacyUpdateManifest.fromLegacyRawManifest(LegacyRawManifest(manifestJson), configuration!!)
      }
      Integer.valueOf(expoProtocolVersion) == 0 -> {
        NewUpdateManifest.fromRawManifest(NewRawManifest(manifestJson), httpResponse, configuration!!)
      }
      else -> {
        throw Exception("Unsupported expo-protocol-version: $expoProtocolVersion")
      }
    }
  }

  @Throws(JSONException::class)
  fun getEmbeddedManifest(manifestJson: JSONObject, configuration: UpdatesConfiguration?): UpdateManifest {
    return if (manifestJson.has("releaseId")) {
      LegacyUpdateManifest.fromLegacyRawManifest(LegacyRawManifest(manifestJson), configuration!!)
    } else {
      BareUpdateManifest.fromManifestJson(BareRawManifest(manifestJson), configuration!!)
    }
  }

  fun getRawManifestFromJson(manifestJson: JSONObject): RawManifest {
    return when {
      manifestJson.has("releaseId") -> {
        LegacyRawManifest(manifestJson)
      }
      manifestJson.has("metadata") -> {
        NewRawManifest(manifestJson)
      }
      else -> {
        BareRawManifest(manifestJson)
      }
    }
  }
}
