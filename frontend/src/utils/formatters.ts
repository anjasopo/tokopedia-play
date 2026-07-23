export const formatPrice = (price: number): string => {
  if (!price || price === 0) {
    return 'Gratis';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (num?: number): string => {
  if (!num) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export const formatRelativeTime = (timestamp?: string): string => {
  if (!timestamp) return 'baru saja';
  
  const now = new Date();
  const commentTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - commentTime.getTime()) / 1000);

  if (diffInSeconds < 30) {
    return 'baru saja';
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds}dtk yang lalu`;
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}mnt yang lalu`;
  }

  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}jam yang lalu`;
  }

  return commentTime.toLocaleDateString('id-ID', {
    month: 'short',
    day: 'numeric',
  });
};
