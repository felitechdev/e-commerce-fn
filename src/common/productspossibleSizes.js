export const sizeOptions = [
  // Common sizes for all categories
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "Extra Large", value: "xl" },
  // Additional sizes for clothing
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
  { label: "XXL", value: "xxl" },
  // Additional sizes for shoes
  { label: "US 5", value: "us5" },
  { label: "US 6", value: "us6" },
  { label: "US 7", value: "us7" },
  { label: "US 8", value: "us8" },
  { label: "US 9", value: "us9" },
  // EU sizes
  { label: "EU 36", value: "eu36" },
  { label: "EU 37", value: "eu37" },
  { label: "EU 38", value: "eu38" },
  { label: "EU 39", value: "eu39" },
  { label: "EU 40", value: "eu40" },
  // UK sizes
  { label: "UK 3", value: "uk3" },
  { label: "UK 4", value: "uk4" },
  { label: "UK 5", value: "uk5" },
  { label: "UK 6", value: "uk6" },
  { label: "UK 7", value: "uk7" },
  // Centimeter sizes
  { label: "CM 22", value: "cm22" },
  { label: "CM 23", value: "cm23" },
  { label: "CM 24", value: "cm24" },
  { label: "CM 25", value: "cm25" },
  { label: "CM 26", value: "cm26" },
  // Additional sizes for hats
  { label: "Small (S)", value: "small-s" },
  { label: "Medium (M)", value: "medium-m" },
  { label: "Large (L)", value: "large-l" },
  // Additional sizes for jewelry
  { label: '16" (Inch)', value: "16inch" },
  { label: '18" (Inch)', value: "18inch" },
  { label: '20" (Inch)', value: "20inch" },
  // Additional sizes for electronics
  { label: '13" (Inch)', value: "13inch" },
  { label: '15" (Inch)', value: "15inch" },
  { label: '17" (Inch)', value: "17inch" },
  { label: '21" (Inch)', value: "21inch" },
  { label: '24" (Inch)', value: "24inch" },
  // Additional sizes for other categories
  ...Array.from({ length: 200 }, (_, index) => ({
    label: `${(index + 1) / 2} kg`,
    value: `${(index + 1) / 2}kg`,
  })),
  ...Array.from({ length: 200 }, (_, index) => ({
    label: `${(index + 1) / 2} liter`,
    value: `${(index + 1) / 2}l`,
  })),

  ...Array.from({ length: 100 }, (_, index) => ({
    label: `${(index + 1) / 2} `,
    value: `${(index + 1) / 2}`,
  })),

  ...Array.from({ length: 1024 }, (_, index) => ({
    label: `${index + 1}KB `,
    value: `${index + 1}Kb`,
  })),

  ...Array.from({ length: 1024 }, (_, index) => ({
    label: `${index + 1}MB `,
    value: `${index + 1}Mb`,
  })),

  ...Array.from({ length: 1024 }, (_, index) => ({
    label: `${index + 1}GB `,
    value: `${index + 1}Gb`,
  })),
  ...Array.from({ length: 1024 }, (_, index) => ({
    label: `${index + 1}TB `,
    value: `${index + 1}Tb`,
  })),

  // Add more specific sizes for each category and subcategory as needed
];
