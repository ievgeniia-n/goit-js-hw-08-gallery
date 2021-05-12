import gallery from "./gallery-items.js";

const wrapperRef = document.querySelector(".js-gallery");

const getImageFromGallery = gallery.map((el, i) => onCreateGallery(el, i));

wrapperRef.append(...getImageFromGallery);

const mainRefs = {
  boxImageRef: document.querySelector(".lightbox__image"),
  backDropWrapper: document.querySelector(".lightbox"),
  onCloseBtnRef: document.querySelector('button[data-action="close-lightbox"]'),
  backDrop: document.querySelector(".lightbox__overlay"),
  imagesRef: document.querySelector(".js-lightbox"),
  btnRightArrowRef: document.querySelector(
    'button[data-change="right__arrow"]'
  ),
  btnLeftArrowRef: document.querySelector('button[data-change="left__arrow"]'),
};

wrapperRef.addEventListener("click", openModal);
mainRefs.backDrop.addEventListener("click", onBackDropCloseModal);
mainRefs.onCloseBtnRef.addEventListener("click", closeModal);

function onCreateGallery(image, i) {
  const refs = {
    createListRef: document.createElement("li"),
    createImageRef: document.createElement("img"),
    createLinkRef: document.createElement("a"),
  };

  refs.createListRef.classList.add("gallery__item");
  refs.createImageRef.classList.add("gallery__image");
  refs.createLinkRef.classList.add("gallery__link");

  refs.createLinkRef.setAttribute("href", image.original);
  refs.createImageRef.setAttribute("src", image.preview);
  refs.createImageRef.setAttribute("alt", image.description);
  refs.createImageRef.setAttribute("data-source", image.original);
  refs.createImageRef.setAttribute("data-index", i);

  refs.createLinkRef.append(refs.createImageRef);
  refs.createListRef.append(refs.createLinkRef);

  return refs.createListRef;
}

function imgAttribute(src, alt, index) {
  mainRefs.boxImageRef.setAttribute("src", src);
  mainRefs.boxImageRef.setAttribute("alt", alt);
  mainRefs.boxImageRef.setAttribute("data-index", index);
}

function openModal(event) {
  event.preventDefault();

  const getImg = event.target;

  if (getImg.nodeName !== "IMG") {
    return;
  }

  mainRefs.backDropWrapper.classList.add("is-open");
  imgAttribute(getImg.dataset.source, getImg.alt, getImg.dataset.index);

  window.addEventListener("keyup", closeModalByEsc);
  window.addEventListener("keyup", pressRightBtn);
  window.addEventListener("keyup", pressLeftBtn);
  mainRefs.btnRightArrowRef.addEventListener("click", onRightArrowClick);
  mainRefs.btnLeftArrowRef.addEventListener("click", onLeftArrowClick);
}

function closeModal() {
  mainRefs.boxImageRef.setAttribute("src", "");
  mainRefs.boxImageRef.setAttribute("alt", "");
  mainRefs.backDropWrapper.classList.toggle("is-open");
  window.removeEventListener("keyup", closeModalByEsc);
  window.removeEventListener("keyup", pressRightBtn);
  window.removeEventListener("keyup", pressLeftBtn);
  mainRefs.btnRightArrowRef.removeEventListener("click", onRightArrowClick);
  mainRefs.btnLeftArrowRef.removeEventListener("click", onLeftArrowClick);
}

function onBackDropCloseModal(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function closeModalByEsc(event) {
  if (event.key !== "Escape") {
    return;
  }
  closeModal();
}

function pressRightBtn(event) {
  if (event.key === "ArrowRight") {
    setImgAttribute(+mainRefs.boxImageRef.dataset.index, +1);
  }
}

function pressLeftBtn(event) {
  if (event.key === "ArrowLeft") {
    setImgAttribute(+mainRefs.boxImageRef.dataset.index, -1);
  }
}

function onRightArrowClick() {
  setImgAttribute(+mainRefs.boxImageRef.dataset.index, +1);
}

function onLeftArrowClick() {
  setImgAttribute(+mainRefs.boxImageRef.dataset.index, -1);
}

function setImgAttribute(index, count) {
  const newIndex = index + count;

  if (newIndex === gallery.length || newIndex === -1) return;

  imgAttribute(
    gallery[newIndex].original,
    gallery[newIndex].description,
    newIndex
  );
}
