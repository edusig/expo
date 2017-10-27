/* @flow */

import React from 'react';
import {
  Image,
  Keyboard,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from '@expo/ex-navigation';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import ExUrls from 'ExUrls';
import FadeIn from '@expo/react-native-fade-in-image';
import TouchableNativeFeedbackSafe from '@expo/react-native-touchable-native-feedback-safe';

@withNavigation
export default class SmallProjectCard extends React.Component {
  render() {
    let {
      hideUsername,
      likeCount,
      projectName,
      projectUrl,
      username,
      privacy,
      slug,
      iconUrl,
    } = this.props;

    const isUnlisted = privacy === 'unlisted';
    const renderLikes = typeof likeCount === 'number' && !isUnlisted;

    return (
      <TouchableNativeFeedbackSafe
        onLongPress={this._handleLongPressProject}
        onPress={this._handlePressProject}
        fallback={TouchableHighlight}
        underlayColor="#b7b7b7"
        style={[styles.container, this.props.fullWidthBorder && styles.bottomBorder]}>
        <View style={styles.iconContainer}>{this._maybeRenderIcon()}</View>

        <View style={[styles.infoContainer, !this.props.fullWidthBorder && styles.bottomBorder]}>
          <Text style={styles.projectNameText} ellipsizeMode="tail" numberOfLines={1}>
            {projectName}
          </Text>

          <View style={styles.projectExtraInfoContainer}>
            <Text
              onPress={username ? this._handlePressUsername : null}
              style={[
                styles.projectExtraInfoText,
                (renderLikes || isUnlisted) && { flexShrink: 4 },
              ]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {hideUsername ? slug : username || projectUrl}
            </Text>

            {isUnlisted && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bullet} />
                <View style={styles.unlistedIconContainer}>
                  <Ionicons name="ios-eye-off" size={15} color="rgba(36, 44, 58, 0.3)" />
                </View>

                <Text style={styles.unlistedText}>Unlisted</Text>
              </View>
            )}

            {renderLikes && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bullet} />
                <Text onPress={() => {}} numberOfLines={1} style={styles.projectExtraInfoText}>
                  {likeCount} {likeCount === 1 ? 'like' : 'likes'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableNativeFeedbackSafe>
    );
  }

  _maybeRenderIcon = () => {
    let { iconUrl } = this.props;

    if (iconUrl) {
      return (
        <View style={styles.iconClipContainer}>
          <FadeIn placeholderColor="#eee">
            <Image source={{ uri: iconUrl }} style={styles.icon} />
          </FadeIn>
        </View>
      );
    } else {
      return <View style={[styles.icon, { backgroundColor: '#eee' }]} />;
    }
  };

  _handlePressProject = () => {
    // note(brentvatne): navigation should do this automatically
    Keyboard.dismiss();

    let url = ExUrls.normalizeUrl(this.props.projectUrl);
    Linking.openURL(url);
  };

  _handleLongPressProject = () => {
    let url = ExUrls.normalizeUrl(this.props.projectUrl);
    Share.share({
      title: this.props.projectName,
      message: url,
      url,
    });
  };

  _handlePressUsername = () => {
    // note(brentvatne): navigation should do this automatically
    Keyboard.dismiss();

    this.props.navigator.push('profile', { username: this.props.username });
  };
}

// note(brentvatne): we need to know this value so we can set the width of
// extra info container so it properly sizes the url / likes, otherwise it
// just overflows. I think this is a yoga bug
const IconPaddingLeft = 15;
const IconPaddingRight = 10;
const IconWidth = 40;

const styles = StyleSheet.create({
  bottomBorder: {
    flexGrow: 1,
    borderBottomColor: Colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
  },
  iconContainer: {
    paddingLeft: IconPaddingLeft,
    paddingRight: IconPaddingRight,
    paddingTop: 12,
    paddingBottom: 10,
  },
  iconClipContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  icon: {
    width: IconWidth,
    height: IconWidth,
    backgroundColor: '#fff',
    borderRadius: 3,
    ...Platform.select({
      android: {
        marginTop: 3,
      },
    }),
  },
  infoContainer: {
    paddingTop: 13,
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingBottom: 10,
  },
  projectNameText: {
    color: Colors.blackText,
    fontSize: 15,
    marginRight: 70,
    marginBottom: 2,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '400',
        marginTop: 1,
      },
    }),
  },
  projectExtraInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Layout.window.width - IconPaddingRight - IconPaddingLeft - IconWidth - 10,
  },
  projectExtraInfoText: {
    color: Colors.greyText,
    fontSize: 13,
  },
  bullet: {
    width: 3.5,
    height: 3.5,
    borderRadius: 3.5 / 2,
    backgroundColor: 'rgba(36, 44, 58, 0.2)',
    marginHorizontal: 6,
  },
  unlistedIconContainer: {
    flexDirection: 'row',
  },
  unlistedText: {
    marginLeft: 3,
    color: Colors.greyText,
    fontSize: 13,
  },
});
