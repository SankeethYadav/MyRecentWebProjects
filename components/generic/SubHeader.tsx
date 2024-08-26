// import React, { useState } from "react";
// import { Button, buttonVariants } from "@/components/ui/button";
// import "../../styles/sub-header.css";
// import { SubHeaderProps } from "../types/SubHeader";

// const SubHeader: React.FC<SubHeaderProps> = ({...props}) => {
//   const [buttonStates, setButtonStates] = useState<boolean[]>(
//     new Array(props.buttons.length).fill(false)
//   );

//   const handleButtonClick = (index: number) => {
//     setButtonStates((prevButtonStates) => {
//       const newButtonStates = [...prevButtonStates];
//       newButtonStates[index] = !newButtonStates[index];
//       return newButtonStates;
//     });
//     props.buttons[index].handler();
//   };

//   const getButtonClasses = (clicked: boolean) =>
//     buttonVariants({
//       variant: clicked ? "outline" : "primary",
//       size: "default",
//       className: clicked ? "clickedButton" : "customButton",
//     });

//   return (
//     <div className="subHeaderContainer">
//       <div className="titleContainer">
//         <div className="backButton" onClick={props.backButtonHandler}>
//           <svg
//             className="arrowIcon"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 12H5m7-7-7 7 7 7"
//             />
//           </svg>
//         </div>
//         <div className="titleText">{props.title}</div>
//       </div>
//       <div className="buttonsContainer">
//         {props.buttons.slice(0, 2).map((button, index) => (
//           <Button
//             key={index}
//             className={getButtonClasses(buttonStates[index])}
//             onClick={() => handleButtonClick(index)}
//           >
//             {buttonStates[index] ? (
//               <svg
//                 className="iconClicked"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M3 6h18M3 12h18m-9 6h9"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="icon"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                 />
//               </svg>
//             )}

//             {button.label}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubHeader;
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import "../../styles/sub-header.css";
import { SubHeaderProps } from "../types/SubHeader";

const SubHeader: React.FC<SubHeaderProps> = ({ backButtonHandler, title, buttons }) => {
  const initialButtonStates = buttons ? new Array(buttons.length).fill(false) : [];

  const [buttonStates, setButtonStates] = useState<boolean[]>(initialButtonStates);

  const handleButtonClick = (index: number) => {
    if (buttons) {
      setButtonStates((prevButtonStates) => {
        const newButtonStates = [...prevButtonStates];
        newButtonStates[index] = !newButtonStates[index];
        return newButtonStates;
      });
      buttons[index].handler();
    }
  };

  const getButtonClasses = (clicked: boolean) =>
    buttonVariants({
      variant: clicked ? "outline" : "primary",
      size: "default",
      className: clicked ? "clickedButton" : "customButton",
    });

  return (
    <div className="subHeaderContainer">
      <div className="titleContainer">
        <div className="backButton" onClick={backButtonHandler}>
          <svg
            className="arrowIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m7-7-7 7 7 7"
            />
          </svg>
        </div>
        <div className="titleText">{title}</div>
      </div>
      <div className="buttonsContainer">
        {buttons?.slice(0, 2).map((button, index) => (
          <Button
            key={index}
            className={getButtonClasses(buttonStates[index])}
            onClick={() => handleButtonClick(index)}
          >
            {buttonStates[index] ? (
              <svg
                className="iconClicked"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6h18M3 12h18m-9 6h9"
                />
              </svg>
            ) : (
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}

            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubHeader;

