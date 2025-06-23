const rawProductStats = [
  { label: 'Bò nướng lá lốt', value: 180 },
  { label: 'Gà nướng mật ong', value: 150 },
  { label: 'Cá hồi sốt Teriyaki', value: 100 },
  { label: 'Sườn nướng BBQ', value: 130 },
  { label: 'Salad dầu giấm', value: 90 },
  { label: 'Cơm chiên Dương Châu', value: 170 },
  { label: 'Phở bò tái', value: 200 },
  { label: 'Bún chả Hà Nội', value: 160 },
  { label: 'Chả giò chiên giòn', value: 110 },
];

const total = rawProductStats.reduce((sum, item) => sum + item.value, 0);

// Gộp các món <10% thành 'Other'
export const productStats = (() => {
  const threshold = 0.1; // 10%
  const others = rawProductStats.filter(item => item.value / total < threshold);
  const major = rawProductStats.filter(item => item.value / total >= threshold);

  const otherTotal = others.reduce((sum, item) => sum + item.value, 0);

  return otherTotal > 0
    ? [...major, { label: 'Other', value: otherTotal }]
    : major;
})();

export const valueFormatter = (item: { value: number }) =>
  `${((item.value / total) * 100).toFixed(1)}%`;