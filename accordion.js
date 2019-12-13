let lastOpen = "";
let itsAlreadyOpenFlag = false;
document.querySelectorAll(".accordion").forEach(each => {
  each.addEventListener("click", function() {
    document.querySelectorAll(".accordion").forEach(eachAcc => {
      let eachPanel = eachAcc.nextElementSibling;

      eachPanel.style.maxHeight = null;
    });

    if (lastOpen == this) {
      lastOpen = "";
    } else {
      this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
      lastOpen = this;
    }
  });
});
