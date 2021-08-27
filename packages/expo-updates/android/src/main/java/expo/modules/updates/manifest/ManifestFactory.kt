package expo.modules.updates.manifest

import expo.modules.updates.UpdatesConfiguration
import expo.modules.manifests.core.BareManifest
import expo.modules.manifests.core.LegacyManifest
import expo.modules.manifests.core.NewManifest
import expo.modules.manifests.core.Manifest
import org.json.JSONException
import org.json.JSONObject

object ManifestFactory {
  private val TAG = ManifestFactory::class.java.simpleName

  @Throws(Exception::class)
  fun getManifest(manifestJson: JSONObject, httpResponse: ManifestResponse, configuration: UpdatesConfiguration?): UpdateManifest {
    val expoProtocolVersion = httpResponse.header("expo-protocol-version", null)
    return when {
      expoProtocolVersion == null -> {
        LegacyUpdateManifest.fromLegacyRawManifest(LegacyManifest(manifestJson), configuration!!)
      }
      Integer.valueOf(expoProtocolVersion) == 0 -> {
        NewUpdateManifest.fromRawManifest(NewManifest(manifestJson), httpResponse, configuration!!)
      }
      else -> {
        throw Exception("Unsupported expo-protocol-version: $expoProtocolVersion")
      }
    }
  }

  @Throws(JSONException::class)
  fun getEmbeddedManifest(manifestJson: JSONObject, configuration: UpdatesConfiguration?): UpdateManifest {
    return if (manifestJson.has("releaseId")) {
      LegacyUpdateManifest.fromLegacyRawManifest(LegacyManifest(manifestJson), configuration!!)
    } else {
      BareUpdateManifest.fromManifestJson(BareManifest(manifestJson), configuration!!)
    }
  }

  fun getRawManifestFromJson(manifestJson: JSONObject): Manifest {
    return when {
      manifestJson.has("releaseId") -> {
        LegacyManifest(manifestJson)
      }
      manifestJson.has("metadata") -> {
        NewManifest(manifestJson)
      }
      else -> {
        BareManifest(manifestJson)
      }
    }
  }
}
