// Copyright (c) 2020-2021 Drew Lemmy
// This file is part of KristWeb 2 under AGPL-3.0.
// Full details: https://github.com/tmpim/KristWeb2/blob/master/LICENSE.txt
import { Tag } from "antd";

import { useTranslation } from "react-i18next";

import semverMajor from "semver/functions/major";
import semverMinor from "semver/functions/minor";
import semverPatch from "semver/functions/patch";
import semverPrerelease from "semver/functions/prerelease";

import { ConditionalLink } from "@comp/ConditionalLink";

import { getDevState } from "@utils";

declare const __GIT_VERSION__: string;

const prereleaseTagColours: { [key: string]: string } = {
  "dev": "red",
  "alpha": "orange",
  "beta": "blue",
  "rc": "green"
};

const GIT_RE = /^\d+-g[a-f0-9]{5,32}(?:-dirty)?$/;

export function Brand(): JSX.Element {
  const { t } = useTranslation();

  //const gitVersion: string = __GIT_VERSION__;
  const gitVersion: string = "0.0.1"

  const major = semverMajor(gitVersion);
  const minor = semverMinor(gitVersion);
  const patch = semverPatch(gitVersion);
  const prerelease = semverPrerelease(gitVersion);

  const isGit = prerelease ? GIT_RE.test(prerelease.join("")) : false;

  const { isDirty, isDev } = getDevState();

  // Convert semver prerelease parts to Bootstrap badge
  const tagContents = isDirty || isDev
    ? ["dev"]
    : (isGit ? null : prerelease);
  let tag = null;
  if (tagContents && tagContents.length) {
    const variant = prereleaseTagColours[tagContents[0]] || undefined;
    tag = <Tag color={variant}>{tagContents.join(".")}</Tag>;
  }

  return <div className="site-header-brand">
    <ConditionalLink to="/" matchTo matchExact>
      <img src="/logo.svg" className="logo" />
      {t("app.name")}
      {tag}
    </ConditionalLink>
  </div>;
}
