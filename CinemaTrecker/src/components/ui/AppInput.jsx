import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { radius, spacing, typography } from '../../constants/theme';

export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  icon,
  isPassword = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  boxStyle,
  ...restProps
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const animateTo = (toValue) => {
    Animated.timing(focusAnim, {
      toValue,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    animateTo(1);
    if (restProps.onFocus) restProps.onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    animateTo(0);
    if (restProps.onBlur) restProps.onBlur(e);
  };

  const animatedBorder = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.BORDER, colors.PRIMARY],
  });

  const borderColor = error ? colors.ERROR : animatedBorder;

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Animated.View
        style={[styles.box, multiline && styles.boxMultiline, boxStyle, { borderColor }]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? colors.PRIMARY : colors.TEXT_MUTED}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          {...restProps}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.TEXT_MUTED}
          keyboardType={keyboardType}
          secureTextEntry={isPassword ? secureTextEntry : false}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[styles.input, multiline && { minHeight: 24 * numberOfLines }]}
        />

        {isPassword ? (
          <Pressable onPress={() => setSecureTextEntry((s) => !s)} hitSlop={10}>
            <Ionicons
              name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.TEXT_MUTED}
            />
          </Pressable>
        ) : null}
      </Animated.View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.lg },
  label: {
    ...typography.captionMedium,
    color: colors.TEXT_SECONDARY,
    marginBottom: spacing.xs,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1.5,
    borderRadius: radius.md,
    backgroundColor: colors.SURFACE,
    paddingHorizontal: spacing.md,
  },
  boxMultiline: { alignItems: 'flex-start', paddingVertical: spacing.sm },
  leftIcon: { marginRight: spacing.sm },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.TEXT,
    paddingVertical: spacing.sm,
  },
  error: {
    ...typography.caption,
    color: colors.ERROR,
    marginTop: spacing.xs,
  },
});
