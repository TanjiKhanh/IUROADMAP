import { useEffect, useState } from 'react';
import { UiInput, UiSearchIcon } from '../../../uikit';

export interface KeywordFilterProps {
  value?: string;
  placeholder?: string;
  onSearch: (keyword: string | undefined) => void;
  width?: number;
}

/** Search box that applies on Enter or when cleared. */
export function KeywordFilter({ value, placeholder, onSearch, width = 260 }: KeywordFilterProps) {
  const [draft, setDraft] = useState(value ?? '');
  useEffect(() => setDraft(value ?? ''), [value]);

  return (
    <UiInput
      style={{ width }}
      value={draft}
      allowClear
      prefix={<UiSearchIcon />}
      placeholder={placeholder}
      onChange={(event) => {
        setDraft(event.target.value);
        if (!event.target.value) onSearch(undefined);
      }}
      onPressEnter={() => onSearch(draft.trim() || undefined)}
    />
  );
}
