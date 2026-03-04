const activeBtn = ['bg-[#422AD5]', 'text-white']
// click btn identify;
const setActiveBtn = (clickBtn)=>{
    const lessonClassBtn = document.querySelectorAll('.lesson-class-btn');
    lessonClassBtn.forEach(btn =>{
      btn.classList.remove(...activeBtn)
      btn.classList.add('btn-outline')
        
    })
    clickBtn.classList.remove('btn-outline')
    clickBtn.classList.add(...activeBtn)
}

// spinner section;
const loadingSpinner = (loadingElement =>{
    const loading = document.getElementById('spinner');
    const wordContainer = document.getElementById('word-container')
    if(loadingElement === true){
        loading.classList.remove('hidden');
        wordContainer.classList.add('hidden')
    }
    else{
        loading.classList.add('hidden');
        wordContainer.classList.remove('hidden')
    }
})
// synonyms word add;
const synonyms = (arr =>{
    const arrHtml = arr.map((el)=> `<span class="btn">${el}</span>`)
    return arrHtml.join(' ')
})
// modal fetch;
const showModal =(modal =>{
    const url =`https://openapi.programming-hero.com/api/word/${modal}`
    // console.log(url)

    fetch(url)
    .then(res => res.json())
    .then(data => modalDisplay(data.data))
})

// display modalbox
const modalDisplay = (word =>{
    // console.log(word)
    const modalBox = document.getElementById('modal-box')
    modalBox.innerHTML = `
        <div class = "bg-white py-10 px-5 rounded-md">
            <div class ="space-y-5">
            <h2 class="font-bold text-xl md:text-3xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
            <h3 class="text-lg font-medium">Meaning</h3>
            <p class="font-bold text-lg md:text-2xl">${word.meaning}</p>
            <h2 class="text-lg font-medium">Example</h2>
            <p class="text-lg font-semibold">${word.sentence}</p>
            <p>সমার্থক শব্দ গুলো</p>
            
            <button class="grid grid-cols-3 gap-3">${synonyms(word.synonyms)}</button>

            
            <form method="dialog">
            <button class="btn btn-primary">Complete Learning</button>
            </form>
            
            </div>
        </div>
    
    `
    document.getElementById('my_modal_5').showModal()
})

// lesson load system add;  
const loaodLesson = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLesson(json.data))
}
// word-container card function;
const wordContainer = (id)=>{
    loadingSpinner(true);
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayWordContainer(data.data))
}

// word-container display;
const displayWordContainer = (words)=>{
    const levelWord = document.getElementById('word-container')
    levelWord.innerHTML = ''

    // empty word section;
    if(words.length === 0){
        levelWord.innerHTML = `
                <div class="text-center space-y-5 py-10 font-bangla rounded-lg col-span-full">
                         <img class="mx-auto" src="./assets/alert-error.png" alt="">
                        <p class="text-lg md:text-2xl font-medium text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                        <h1 class="text-xl md:text-4xl font-bold ">নেক্সট Lesson এ যান</h1>
                </div>
            `
    }

    for(let word of words){
        const card = document.createElement('div')
        card.innerHTML=`
        <div class="bg-white py-10 px-5 rounded-sm text-center space-y-4">
                <h2 class="font-bold text-3xl">${word.word? word.word : 'শব্দ পাওয়া যায়নি।'}</h2>
                <p class="font-medium text-lg">Meaning /Pronounciation</p>
                <p class="font-semibold text-3xl font-bangla">"${word.meaning? word.meaning : 'Meaning পাওয়া যায়নি।'}/ ${word.pronunciation? word.pronunciation : 'Pronunciation পাওয়া যায়নি।'}"</p>

                <div class="flex justify-between items-center">
                    <button onclick="showModal(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
                       <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
        </div>
        
        `
        levelWord.appendChild(card)
    }
    loadingSpinner(false)
}
// Data load & display Lesson button section;
const displayLesson = (lessons)=>{
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';

    for(const allLesson of lessons){
        // console.log(allLesson)
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML =`
                            <button id="lesson-btn" onclick="wordContainer(${allLesson.level_no});setActiveBtn(this)" class="btn btn-outline btn-primary lesson-class-btn">
                            <i class="fa-solid fa-book-open"></i> Lesson - ${allLesson.level_no}
                            </button>
                            `;

        lessonContainer.appendChild(btnDiv)
    }
}
loaodLesson()


const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {

    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim().toLowerCase();

    if(searchValue === ''){
        alert('Please type something');
        return;
    }

    loadingSpinner(true);

    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {

            const allWords = data.data;

            const filterWord = allWords.filter(word =>
                word.word && word.word.toLowerCase().includes(searchValue)
            );

            displayWordContainer(filterWord);
            loadingSpinner(false);
        });
});