const uploadInput = document.getElementById("uploadInput");
const imgNames = document.querySelector(".img-names__container");
const errorMsg = document.createElement("div");
const uploaderTitle = document.querySelector(".uploader__title");
const selectBtn = document.querySelector(".select__label");
const imgListTitle = document.createElement("h1");
const buttonsContainer = document.createElement("div");
const uploadBtn = document.createElement("button");
const backBtn = document.createElement("button");
const uploaderContainer = document.querySelector(".uploader__container");
const responseMessage = document.createElement("h1");

const displayImgName = () => {
  const fileList = uploadInput.files;

  imgListTitle.textContent = "Selected files:";
  imgNames.append(imgListTitle);

  if (fileList.length === 5) {
    uploaderTitle.style.display = "none";
    selectBtn.style.display = "none";
    errorMsg.textContent = "";

    Array.from(fileList).forEach((file) => {
      const imgName = document.createElement("p");
      imgName.append(file.name);
      imgNames.append(imgName);
      imgNames.style.display = "flex";
    });
  }

  if (fileList.length > 5) {
    errorMsg.textContent = "Select less images";
    errorMsg.style.color = "red";
    uploaderContainer.append(errorMsg);
  }

  if (fileList.length < 5) {
    errorMsg.textContent = "Select more images";
    errorMsg.style.color = "red";
    uploaderContainer.append(errorMsg);
  }

  buttonsContainer.style.display = "flex";
  buttonsContainer.style.gap = "0.5rem";
  imgNames.append(buttonsContainer);

  backBtn.textContent = "Back";
  backBtn.addEventListener("click", () => backToMain());
  buttonsContainer.append(backBtn);

  uploadBtn.textContent = "Upload";
  uploadBtn.addEventListener("click", () => sendImgs(fileList));
  buttonsContainer.append(uploadBtn);
};

const backToMain = () => {
  uploadInput.value = "";
  console.log(uploadInput);
  imgNames.textContent = "";
  uploaderTitle.style.display = "flex";
  selectBtn.style.display = "block";
};

const sendImgs = async (images) => {
  const formData = new FormData();
  Object.keys(images).forEach((key) => {
    formData.append(images.item(key).name, images.item(key));
  });

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} Unable to find requested URL`);
    }

    const json = await response.json();

    if (response.ok) {
      responseMessage.textContent = json.message;
      imgNames.textContent = "";
      imgNames.append(responseMessage);
    }
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.style.color = "red";
    uploaderContainer.append(errorMsg);
  }
};

uploadInput.addEventListener("change", displayImgName);
