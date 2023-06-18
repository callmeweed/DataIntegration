const types = [
    {
        value: "Bán",
        label: "Mua, bán",
    },
    {
        value: "Thuê",
        label: "Cho thuê",
    },
]
const areas = [
    {
        value: "All",
        label: "Tất cả",
    },
    {
    value: "Dưới 30m2",
    label: "Dưới 30m2",
  },
  {
    value: "Từ 30 - 50m2",
    label: "Từ 30 - 50m2",
  },
    {
        value: "Từ 50 - 80m2",
        label: "Từ 50 - 80m2",
    },
    {
        value: "Từ 80 - 100m2",
        label: "Từ 80 - 100m2",
    },
    {
        value: "Từ 100 - 150m2",
        label: "Từ 100 - 150m2",
    },
    {
        value: "Từ 150 - 250m2",
        label: "Từ 150 - 250m2",
    },
    {
        value: "Từ 250 - 500m2",
        label: "Từ 250 - 500m2",
    },
    {
        value: "Trên 500m2",
        label: "Trên 500m2",
    },

]
const districts = [
    {
        value: "All",
        label: "Tất cả",
        city: 'Hà Nội'
    },
    {
        value: "All",
        label: "Tất cả",
        city: 'Hồ Chí Minh'
    },

    {
        value: "Quận Hoàng Mai",
        label: "Quận Hoàng Mai",
        city: 'Hà Nội',
    },
    {
        value: "Quận Long Biên",
        label: "Quận Long Biên",
        city: 'Hà Nội',
    },
    {
        value: "Quận Thanh Xuân",
        label: "Quận Thanh Xuân",
        city: 'Hà Nội',
    },
    {
        value: "Quận Bắc Từ Liêm",
        label: "Quận Bắc Từ Liêm",
        city: 'Hà Nội',
    },
    {
        value: "Quận Ba Đình",
        label: "Quận Ba Đình",
        city: 'Hà Nội',
    },
    {
        value: "Quận Cầu Giấy",
        label: "Quận Cầu Giấy",
        city: 'Hà Nội',
    },
    {
        value: "Quận Đống Đa",
        label: "Quận Đống Đa",
        city: 'Hà Nội',
    },
    {
        value: "Quận Hai Bà Trưng",
        label: "Quận Hai Bà Trưng",
        city: 'Hà Nội',
    },
    {
        value: "Quận Hoàn Kiếm",
        label: "Quận Hoàn Kiếm",
        city: 'Hà Nội',
    },
    {
        value: "Quận Hà Đông",
        label: "Quận Hà Đông",
        city: 'Hà Nội',
    },
    {
        value: "Quận Tây Hồ",
        label: "Quận Tây Hồ",
        city: 'Hà Nội',
    },
    {
        value: "Quận Nam Từ Liêm",
        label: "Quận Nam Từ Liêm",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Đan Phượng",
        label: "Huyện Đan Phượng",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Gia Lâm",
        label: "Huyện Gia Lâm",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Đông Anh",
        label: "Huyện Đông Anh",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Chương Mỹ",
        label: "Huyện Chương Mỹ",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Hoài Đức",
        label: "Huyện Hoài Đức",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Ba Vì",
        label: "Huyện Ba Vì",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Mỹ Đức",
        label: "Huyện Mỹ Đức",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Phúc Thọ",
        label: "Huyện Phúc Thọ",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Thạch Thất",
        label: "Huyện Thạch Thất",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Quốc Oai",
        label: "Huyện Quốc Oai",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Thanh Trì",
        label: "Huyện Thanh Trì",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Thường Tín",
        label: "Huyện Thường Tín",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Thanh Oai",
        label: "Huyện Thanh Oai",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Phú Xuyên",
        label: "Huyện Phú Xuyên",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Mê Linh",
        label: "Huyện Mê Linh",
        city: 'Hà Nội',
    },
    {
        value: "Huyện Sóc Sơn",
        label: "Huyện Sóc Sơn",
        city: 'Hà Nội',
    },

    {
        value: "Huyện Ứng Hòa",
        label: "Huyện Ứng Hòa",
        city: 'Hà Nội',
    },

    {
        value: "Quận 1",
        label: "Quận 1",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 2",
        label: "Quận 2",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 3",
        label: "Quận 3",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 4",
        label: "Quận 4",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 5",
        label: "Quận 5",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 6",
        label: "Quận 6",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 7",
        label: "Quận 7",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 8",
        label: "Quận 8",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 9",
        label: "Quận 9",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 10",
        label: "Quận 10",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 11",
        label: "Quận 11",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận 12",
        label: "Quận 12",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận Bình Tân",
        label: "Quận Bình Tân",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận Bình Thạnh",
        label: "Quận Bình Thạnh",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận Gò Vấp",
        label: "Quận Gò Vấp",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận Phú Nhuận",
        label: "Quận Phú Nhuận",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận Tân Bình",
        label: "Quận Tân Bình",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Quận Tân Phú",
        label: "Quận Tân Phú",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Huyện Bình Chánh",
        label: "Huyện Bình Chánh",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Huyện Cần Giờ",
        label: "Huyện Cần Giờ",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Huyện Củ Chi",
        label: "Huyện Củ Chi",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Huyện Hóc Môn",
        label: "Huyện Hóc Môn",
        city: 'Hồ Chí Minh',
    },
    {
        value: "Huyện Nhà Bè",
        label: "Huyện Nhà Bè",
        city: 'Hồ Chí Minh',
    },


]
const cities = [
    {
        value: "Hà Nội",
    label: "Hà Nội",
    },
    {
        value: "Hồ Chí Minh",
    label: "Hồ Chí Minh",
    },

]
export default { types, areas,districts,cities}