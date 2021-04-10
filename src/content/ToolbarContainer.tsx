import * as PropTypes from 'prop-types';
import React from 'react';
import { Toolbar } from './Toolbar';
import { usePage } from './usePage';
import { usePageData } from './usePageData';
import { useProfile } from './useProfile';

export const ToolbarContainer = () => {
  const { loading: profileLoading, profile } = useProfile();
  const { url } = usePage();
  const { loading: dataLoading } = usePageData(url);
  return profileLoading || dataLoading ? (
    <p>Loading...</p>
  ) : (
    <Toolbar profile={profile} />
  );
};

ToolbarContainer.propTypes = {
  webId: PropTypes.string,
};