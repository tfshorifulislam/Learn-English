const loaodLesson = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLesson(json.data))
}
// word-container card function;
const wordContainer = (id)=>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayWordContainer(data.data))
}

const displayWordContainer = (words)=>{
    const levelWord = document.getElementById('word-container')
    levelWord.innerHTML = ''
    for(let word of words){
        const card = document.createElement('div')
        card.innerHTML=`
        <div class="bg-white py-10 px-5 rounded-sm text-center space-y-4">
                <h2 class="font-bold text-3xl">${word.word}</h2>
                <p class="font-medium text-lg">Meaning /Pronounciation</p>
                <p class="font-semibold text-3xl font-bangla">"${word.meaning}/ ${word.pronunciation}"</p>

                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
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
}
// Data load & display Lesson button section;
const displayLesson = (lessons)=>{
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';

    for(const allLesson of lessons){
        console.log(allLesson)
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML =`
                            <button onclick="wordContainer(${allLesson.level_no})" class="btn btn-outline btn-primary">
                            <i class="fa-solid fa-book-open"></i> Lesson - ${allLesson.level_no}
                            </button>
                            `;

        lessonContainer.appendChild(btnDiv)
    }
}
loaodLesson()
