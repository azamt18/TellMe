var body_part_name_result;

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

var simptomsList = ['Головная боль', 'Кашель', 'Отечность лица', 
  'Обморок', 'Головокружение', 'Тошнота', 
  'Насморк', 'Боль в ухе', 'Зубная боль', 'Рвота',
  'Снижение аппетита', 'Красный глаз', 'Подергивание века',
  'Боль в носу', 'Отек носа', 'Травма носа',
  'Травма уха'];
initSimptomsList();

window.onload = function () {
    function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  })
}

loadData()
  .then(() => {
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('hidden');
    preloaderEl.classList.remove('visible');
  });
};

function initSimptomsList() {
  for (var i = 0; i < simptomsList.length; i++) {
    var div = document.createElement("div");
    div.className = "inputGroup";
    var input = document.createElement("input");
    input.id = 'option' + i;
    input.name = 'option' + i;
    input.type = 'checkbox';
    var label = document.createElement("label");
    label.innerHTML = simptomsList[i];
    label.setAttribute("for", "option" + i);
    div.appendChild(input);
    div.appendChild(label);
    document.getElementById("simptomsList").appendChild(div);
  }
}

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if(n == 0)     document.getElementById("toreverse").style.display = "";
  else     document.getElementById("toreverse").style.display = "none";

  if (n == 0 || n == (x.length - 1)) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Начать сначала";
    printResult();
  } else {
    document.getElementById("nextBtn").innerHTML = "Вперед";
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function printResult() {
    var resultBodyText = document.getElementById('resultBodyText');
    var resultSimptomText = document.getElementById('resultSimptomText');
    var simptomsListElements = document.getElementsByClassName("inputGroup");
    var simptomResultList = document.getElementById("simptomResultList");
    resultBodyText.innerHTML = `Выбрано часть тела: <h3>${body_part_name_result}</h3>`;
    console.log(simptomsListElements[0].firstElementChild.checked);
    for (var i = 0; i < simptomsList.length; i++) {
      if (simptomsListElements[i].firstElementChild.checked) {
        var li = document.createElement("li");
        li.innerHTML = simptomsListElements[i].children[1].innerHTML;
        simptomResultList.appendChild(li);
      }
    }
}

var _button_toreverse = document.querySelector('.toreverse');
_button_toreverse.onclick = function showReverseSide() {
    var front_body = document.querySelector(".front_human");
    var back_body = document.querySelector(".back_human");
    if (front_body.style.display === "none") {
        front_body.style.display = "block";
        back_body.style.display = "none";
        _button_toreverse.textContent = 'Перевернуть';
    } else {
        front_body.style.display = "none";
        back_body.style.display = "flex";
        _button_toreverse.textContent = 'Перевернуть';

    }
}

var selected_part = document.getElementsByClassName('selected_part');

for(let i = 0; i < selected_part.length; i++){
  var part_name;
  selected_part[i].onclick = function(){
    for(let j = 0; j < selected_part.length; j++)    selected_part[j].style.background = '';

    selected_part[i].style.background = 'rgba(185, 73, 73, 0.616)';
    part_name = selected_part[i].getAttribute('name');
      img_tab();
      var body_part_name = document.getElementsByClassName('part');
      console.log(body_part_name);
      for(let k = 0; k < body_part_name.length; k++){

        body_part_name[k].onclick = function(){

          body_part_name_result = body_part_name[k].getAttribute('name');
          for(let j = 0; j < body_part_name.length; j++){
            if(body_part_name_result === body_part_name[j].getAttribute('name')){
              body_part_name[j].style.background = 'rgba(185, 73, 73, 0.616)';
            }else body_part_name[j].style.background = '';
          }
          console.log(body_part_name_result);
        }
      }

    // console.log(part_name);
  }
}

function img_tab(){
  var part = document.getElementById('part');
  console.log(part_name);
  

  if(part_name == 'front_head'){  
    part.innerHTML = `<img src="img/${part_name}.png" alt="">
    <div class="row">
    <div class="part nose" name="Нос"></div>
    <div class="part eye_right" name="Глаза"></div>
    <div class="part eye_left" name="Глаза"></div>
    <div class="part ear_right" name="Уши"></div>
    <div class="part ear_left" name="Уши"></div>
    <div class="part mouth" name="Рот"></div>
    <div class="part forehead" name="Лоб"></div>
    <div class="part head" name="Голова"></div>
    <div class="part throat" name="Горло"></div>
    </div>
    `
  }
  else{
    part.innerHTML = `<img src="img/${part_name}.png" alt="">`;
  }

}