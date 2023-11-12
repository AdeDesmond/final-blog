const changeColors = (blog: any) => {
  const colors =
    blog?.category?.category === "Technology"
      ? " text-blue-400"
      : blog?.category?.category === "Universe"
      ? " text-red-400"
      : blog?.category?.category === "Health"
      ? " text-green-400"
      : blog?.category?.category === "Politics"
      ? " text-yellow-400"
      : blog?.category?.category === "Sports"
      ? " text-purple-400"
      : blog?.category?.category === "Entertainment"
      ? " text-pink-400"
      : blog?.category?.category === "Lifestyle"
      ? " text-indigo-400"
      : blog?.category?.category === "Fashion"
      ? " text-gray-400"
      : blog?.category?.category === "Food"
      ? " text-yellow-400"
      : blog?.category?.category === "Travel"
      ? " text-green-400"
      : blog?.category?.category === "Education"
      ? " text-blue-400"
      : blog?.category?.category === "Business"
      ? " text-red-400"
      : blog?.category?.category === "Science"
      ? " text-yellow-400"
      : blog?.category?.category === "Culture"
      ? " text-pink-400"
      : blog?.category?.category === "Art"
      ? " text-purple-400"
      : blog?.category?.category === "History"
      ? " text-indigo-400"
      : blog?.category?.category === "Nature"
      ? " text-green-400"
      : blog?.category?.category === "Architecture"
      ? " text-blue-400"
      : blog?.category?.category === "Animals"
      ? " text-red-400"
      : blog?.category?.category === "Design"
      ? " text-yellow-400"
      : blog?.category?.category === "Photography"
      ? " text-pink-400"
      : blog?.category?.category === "Automobile"
      ? " text-purple-400"
      : blog?.category?.category === "Gadgets"
      ? " text-indigo-400"
      : blog?.category?.category === "Gaming"
      ? " text-blue-400"
      : blog?.category?.category === "Movies"
      ? " text-red-400"
      : blog?.category?.category === "Music"
      ? " text-yellow-400"
      : blog?.category?.category === "Books"
      ? " text-pink-400"
      : blog?.category?.category === "Beauty"
      ? " text-purple-400"
      : blog?.category?.category === "Fitness"
      ? " text-indigo-400"
      : blog?.category?.category === "Diy"
      ? " text-blue-400"
      : " text-black";
  return colors;
};

const changeTimeColors = (blog: any) => {
  const colors =
    blog?.time === 5
      ? " text-blue-400"
      : blog?.time === 10
      ? " text-red-400"
      : blog?.time === 15
      ? " text-green-400"
      : blog?.time === 20
      ? " text-yellow-400"
      : blog?.time === 25
      ? " text-purple-400"
      : blog?.time === 30
      ? " text-pink-400"
      : blog?.time === 35
      ? " text-indigo-400"
      : blog?.time === 40
      ? " text-gray-400"
      : blog?.time === 45
      ? " text-yellow-400"
      : blog?.time === 50
      ? " text-green-400"
      : blog?.time === 55
      ? " text-blue-400"
      : blog?.time === 60
      ? " text-red-400"
      : " text-black";
  return colors;
};

export { changeColors, changeTimeColors };
