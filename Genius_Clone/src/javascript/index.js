const buttonsTableGame = document.querySelectorAll(".table-game button");

const sequence = ["green", "yellow", "red"];
const sequenceUser = [];

buttonsTableGame.forEach((item) => {
  item.addEventListener("click", (event) => {
    let color = event.target.getAttribute("id");

    sequenceUser.push(color);

    checkSequence()

  });
});

function checkSequence() {
  sequenceUser.forEach((item, index) => {
    if (item !== sequence[index]) {
      console.log("Errado");
      sequenceUser.splice(0, sequenceUser.length);
      return;
    }

    console.log(item, index, 'Correto');
    return;
  });
}
