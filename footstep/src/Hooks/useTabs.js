export const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

// const content = [
//   {
//     tab: "Section 1",
//     contents: "I'm the content of the Section 1"
//   },
//   {
//     tab: "Section 2",
//     contents: "I'm the content of the Section 2"
//   }
// ];

// const useTabs = (initialTab, allTabs) => {
//   if (!allTabs || !Array.isArray(allTabs)) {
//     return;
//   }
//   const [currentIndex, setCurrentIndex] = useState(initialTab);
//   return {
//     currentItem: allTabs[currentIndex],
//     changeItem: setCurrentIndex
//   };
// };

// export default function App() {
//   const { currentItem, changeItem } = useTabs(0, content);
//   return (
//     <div className="App">
//       {content.map((section, index) => (
//         <button onClick={() => changeItem(index)}>{section.tab}</button>
//       ))}
//       <div>{currentItem.contents}</div>
//     </div>
//   );
// }