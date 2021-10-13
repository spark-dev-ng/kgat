import React, { useState,useRef } from "react";

const FileUploader = ({onFileSelect}) => {
  const fileInput = useRef(null)

  const handleFileInput = (e) => {
      // handle validations
      onFileSelect(e.target.files[0])
  }

  return (
      <div className="file-uploader">
          <input type="file" onChange={handleFileInput} />
          <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"/>
      </div>
  )
}

const App = (setter) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", selectedFile);
  
    axios
      .post(UPLOAD_URL, formData)
      .then((res) => {
        setter(res)
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error"));
  };

  return (
    <div className="App">
      <form>
        {/* <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}

        <FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />

      </form>
    </div>
  );
};
export default App;