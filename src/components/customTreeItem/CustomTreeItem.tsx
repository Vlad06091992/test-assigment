import { useState } from "react";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "./CustomTreeItem.module.scss";
import { observer } from "mobx-react";
import { taskStore } from "../../../src/store";
import { toJS } from "mobx";

interface TreeItemProps {
  id: string;
  label: any;
  onClick?: (e: MouseEvent) => void;
  children?: any;
}

export const TreeItem: React.FC<TreeItemProps> = observer(
  ({ id, label, onClick, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (e: any) => {
      if (onClick) onClick(e);
    };

    return (
      <div
        className={
          taskStore.currentTask?.id === id ? styles.active : styles.root
        }
        key={id}
      >
        <div onClick={handleClick}>
          {children && children[0] && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </Button>
          )}
          <span
            style={children[0] ? {} : { position: "relative", left: "65px" }}
          >
            {label}
          </span>
        </div>
        <div style={{ marginLeft: "10px" }}>{isExpanded && children}</div>
      </div>
    );
  }
);
