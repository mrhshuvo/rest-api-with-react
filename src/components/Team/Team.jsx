import { useState } from "react";

const Team = () => {
  const [preview, setPreview] = useState();

  // handle image
  const handleImg = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <input type="file" onChange={handleImg} />
      <hr />
      <img src={preview} style={{ height: "200px", width: "200px" }} alt="" />
    </div>
  );
};

export default Team;
