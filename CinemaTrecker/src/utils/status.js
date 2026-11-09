import colors from '../constants/colors';

const STATUS_CONFIG = {
  recommended: { label: 'Рекомендация', color: colors.INFO, background: '#DBEAFE' },
  planned: { label: 'Буду смотреть', color: colors.WARNING, background: '#FEF3C7' },
  watching: { label: 'Пока смотрю', color: colors.PRIMARY, background: '#E0E7FF' },
  watched: { label: 'Просмотрено', color: colors.SUCCESS, background: '#DCFCE7' },
  dropped: { label: 'Брошено', color: colors.ERROR, background: '#FEE2E2' },
};

const FALLBACK = {
  label: 'Неизвестно',
  color: colors.TEXT_SECONDARY,
  background: '#F1F5F9',
};

export function getStatusConfig(status) {
  return STATUS_CONFIG[status] || FALLBACK;
}

export const STATUS_LIST = Object.keys(STATUS_CONFIG);

export const PRIORITY_LABELS = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};
