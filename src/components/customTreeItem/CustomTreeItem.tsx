import { useState } from "react";

interface TreeItemProps {
  id: string;
  label: any;
  onClick?: (e: any) => void;
  children?: any;
}

export const TreeItem: React.FC<TreeItemProps> = ({
  id,
  label,
  onClick,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // debugger;

  console.log(typeof children);

  const handleClick = (e: any) => {
    // e.preventDefault();
    if (onClick) onClick(e);
    // if (children.length) setIsExpanded(!isExpanded);
  };

  return (
    <div key={id}>
      <div onClick={handleClick}>
        {children[0] && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "-" : "+"}
          </button>
        )}
        {label}
      </div>
      <div style={{ marginLeft: "20px" }}>{isExpanded && children}</div>
    </div>
  );
};
