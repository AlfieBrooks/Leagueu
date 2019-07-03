import React from 'react';
import { ActivityIndicator } from 'react-native';
import colourUtils from '../../utils/styles/colours';

export const Loading = ({ size = 'large', color = colourUtils.navy }) => <ActivityIndicator size={size} color={color} />;

export default Loading;
