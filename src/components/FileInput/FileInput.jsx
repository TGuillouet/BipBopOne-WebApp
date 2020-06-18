import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function FileInput(props) {
  const [selectedFile, setFile] = React.useState(null);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    props.onChange(e.target.files[0])
  }

  return (
    <div className="file has-name">
      <label className="file-label">
        <input type="file" onChange={handleChangeFile} accept={props.accept} className="file-input" />
        <span className="file-cta">
          <span className="file-icon">
            <FontAwesomeIcon icon={props.icon} />
          </span>
          <span className="file-label">
            {props.text}
          </span>
        </span>
        <span className="file-name">
          {selectedFile?.name ?? "Choisissez un fichier"}
        </span>
      </label>
    </div>
  );
}
