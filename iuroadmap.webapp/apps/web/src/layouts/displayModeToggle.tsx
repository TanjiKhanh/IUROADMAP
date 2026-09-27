import React from 'react';
import { Dropdown } from 'antd';
import { UiButton } from '../uikit';
import { Monitor, Smartphone, MonitorSmartphone } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDisplayMode, setDisplayMode, DisplayMode } from '@iuroadmap/store';

export const DisplayModeToggle = () => {
  const dispatch = useDispatch();
  const displayMode = useSelector(selectDisplayMode);

  const getIcon = () => {
    switch (displayMode) {
      case 'desktop': return <Monitor size={16} />;
      case 'mobile': return <Smartphone size={16} />;
      default: return <MonitorSmartphone size={16} />;
    }
  };

  const handleModeChange = (mode: DisplayMode) => {
    dispatch(setDisplayMode(mode));
  };

  return (
    <Dropdown
      menu={{
        items: [
          { key: 'auto', label: 'Auto', icon: <MonitorSmartphone size={16} />, onClick: () => handleModeChange('auto') },
          { key: 'desktop', label: 'Desktop', icon: <Monitor size={16} />, onClick: () => handleModeChange('desktop') },
          { key: 'mobile', label: 'Mobile', icon: <Smartphone size={16} />, onClick: () => handleModeChange('mobile') },
        ],
        selectedKeys: [displayMode],
      }}
      trigger={['click']}
    >
      <UiButton type="text" icon={getIcon()} />
    </Dropdown>
  );
};
