import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";

export function FileInput(props) {
  const [selectedFile, setFile] = React.useState(null);

  const handleChangeFile = ({ target: files }) => {
    setFile(files[0]);
    console.log(selectedFile.name)
    props.onChange(files[0])
  }

  return (
    <div className="file has-name">
      <label className="file-label">
        <input type="file" onChange={handleChangeFile} accept=".obj" className="file-input" />
        <span className="file-cta">
          <span className="file-icon">
            <FontAwesomeIcon icon={faFile} />
          </span>
          <span className="file-label">
            Model
          </span>
        </span>
        <span className="file-name">
          {selectedFile?.name ?? "Choisissez un fichier"}
        </span>
      </label>
    </div>
  );
}
