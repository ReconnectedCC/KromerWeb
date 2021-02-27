// Copyright (c) 2020-2021 Drew Lemmy
// This file is part of KristWeb 2 under GPL-3.0.
// Full details: https://github.com/tmpim/KristWeb2/blob/master/LICENSE.txt
import React from "react";
import { Switch } from "antd";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { SettingName, setBooleanSetting } from "../../utils/settings";

interface Props {
  setting: SettingName<boolean>;
  title?: string;
  titleKey?: string;
}

export function SettingBoolean({ setting, title, titleKey }: Props): JSX.Element {
  const settingValue = useSelector((s: RootState) => s.settings[setting]);

  const { t } = useTranslation();

  function onChange(value: boolean) {
    setBooleanSetting(setting, value);
  }

  return <div
    className="menu-item-setting menu-item-setting-switch"
    onClick={() => onChange(!settingValue)}
  >
    <Switch onChange={onChange} checked={settingValue} style={{ marginRight: 12 }} />
    {titleKey ? t(titleKey) : title}
  </div>;
}
