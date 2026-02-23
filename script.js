let interviewList = [];
let rejectedList = [];

let total = document.getElementById('total')
let totall = document.getElementById('totall');
let interviewCount = document.getElementById('interview')
let rejectedCount = document.getElementById('rejected')


const allJobSection = document.getElementById('all-jobs')

const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')

function calculateCount() {
  total.innerText = allJobSection.children.length;
  totall.innerText = allJobSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount()


const allFilterBtn = document.getElementById('allFilter-btn')
const allInterviewBtn = document.getElementById('interview-btn')
const allRejectedBtn = document.getElementById('rejected-btn')

function toggleStyle(id) {
  allFilterBtn.classList.remove('btn-primary')
  allInterviewBtn.classList.remove('text-gray-400', 'bg-white')
  allRejectedBtn.classList.remove('text-gray-400', 'bg-white')


  allFilterBtn.classList.add('text-gray-400', 'bg-white')
  allInterviewBtn.classList.add('text-gray-400', 'bg-white')
  allRejectedBtn.classList.add('text-gray-400', 'bg-white')

  const selected = document.getElementById(id)

  selected.classList.remove('text-gray-400', 'bg-white', 'btn-primary')
  selected.classList.add('btn-primary')

  if (id == 'interview-btn') {
    allJobSection.classList.add('hidden')
    filterSection.classList.remove('hidden')
    renderJobs()
    totall.innerText = interviewList.length;
  } else if (id == 'allFilter-btn') {
    allJobSection.classList.remove('hidden')
    filterSection.classList.add('hidden')
    totall.innerText = allJobSection.children.length;
  } else if (id == 'rejected-btn') {
    allJobSection.classList.add('hidden')
    filterSection.classList.remove('hidden')
    renderrejected()
    totall.innerText = rejectedList.length;
  }
}

filterSection.addEventListener('click', function (event) {
  handleButtonClick(event);
});

mainContainer.addEventListener('click', function (event) {
  handleButtonClick(event);
});

function handleButtonClick(event) {
  if (event.target.classList.contains('fa-trash-can') ||
    event.target.closest('.rounded-\\[99999px\\]')) {

    let deleteBtn = event.target.closest('.rounded-\\[99999px\\]');
    if (!deleteBtn) deleteBtn = event.target.parentElement.closest('.rounded-\\[99999px\\]');

    const parentNode = deleteBtn.closest('.flex.place-content-between');
    if (!parentNode) return;

    const jobName = parentNode.querySelector('.jobName').innerText;

    if (!allJobSection.classList.contains('hidden')) {
      parentNode.remove();

      total.innerText = allJobSection.children.length;
      totall.innerText = allJobSection.children.length;

    }
    else {
      parentNode.remove();

      if (document.getElementById('interview-btn').classList.contains('btn-primary')) {
        interviewList = interviewList.filter(item => item.jobName !== jobName);

        interviewCount.innerText = interviewList.length;
        totall.innerText = interviewList.length;

        renderJobs();

      } else if (document.getElementById('rejected-btn').classList.contains('btn-primary')) {
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);
        rejectedCount.innerText = rejectedList.length;
        totall.innerText = rejectedList.length;

        renderrejected();
      }
    }

  } else if (event.target.classList.contains('interviewBtn') ||
    (event.target.classList.contains('btn-success') && event.target.textContent.includes('Interview'))) {

    let parentNode = event.target.closest('.flex.place-content-between');
    if (!parentNode) return;

    const jobName = parentNode.querySelector('.jobName').innerText
    const category = parentNode.querySelector('.category').innerText
    const titel = parentNode.querySelector('.titel').innerText
    const type = parentNode.querySelector('.type').innerText
    const description = parentNode.querySelector('.description').innerText

    // parentNode.querySelector('.titel').innerText = 'Interview'
    const titleEl = parentNode.querySelector('.titel');
    titleEl.innerText = 'Interview';
    titleEl.classList.remove('text-red-500', 'bg-red-100');
    titleEl.classList.add('text-green-600', 'bg-green-100', 'px-2', 'py-1', 'rounded');

    const cardInfo = {
      jobName,
      category,
      titel: 'Interview',
      type,
      description
    }

    const jobExist = interviewList.find(item => item.jobName == cardInfo.jobName)
    if (!jobExist) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(item => item.jobName !== cardInfo.jobName)

    calculateCount()

    if (allJobSection.classList.contains('hidden')) {
      if (document.getElementById('interview-btn').classList.contains('btn-primary')) {
        totall.innerText = interviewList.length;
        renderJobs()
      } else if (document.getElementById('rejected-btn').classList.contains('btn-primary')) {
        totall.innerText = rejectedList.length;
        renderrejected()
      }
    }

  } else if (event.target.classList.contains('rejectedBtn') ||
    (event.target.classList.contains('btn-error') && event.target.textContent.includes('Rejected'))) {

    let parentNode = event.target.closest('.flex.place-content-between');
    if (!parentNode) return;

    const jobName = parentNode.querySelector('.jobName').innerText
    const category = parentNode.querySelector('.category').innerText
    const titel = parentNode.querySelector('.titel').innerText
    const type = parentNode.querySelector('.type').innerText
    const description = parentNode.querySelector('.description').innerText

    // parentNode.querySelector('.titel').innerText = 'Rejected'
    const titleEl = parentNode.querySelector('.titel');
    titleEl.innerText = 'Rejected';
    titleEl.classList.remove('text-green-600', 'bg-green-100');
    titleEl.classList.add('text-red-500', 'bg-red-100', 'px-2', 'py-1', 'rounded');

    const cardInfo = {
      jobName,
      category,
      titel: 'Rejected',
      type,
      description
    }

    const jobExist = rejectedList.find(item => item.jobName == cardInfo.jobName)
    if (!jobExist) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(item => item.jobName !== cardInfo.jobName)

    calculateCount()

    if (allJobSection.classList.contains('hidden')) {
      if (document.getElementById('rejected-btn').classList.contains('btn-primary')) {
        totall.innerText = rejectedList.length;
        renderrejected()
      } else if (document.getElementById('interview-btn').classList.contains('btn-primary')) {
        totall.innerText = interviewList.length;
        renderJobs()
      }
    }
  }
}

function renderJobs() {
  filterSection.innerHTML = ''

  if (interviewList.length === 0) {
    let div = document.createElement('div')
    div.className = 'flex flex-col items-center justify-center p-16 border border-blue-50 bg-white rounded-md'
    div.innerHTML = `
      <div class="text-center space-y-4">
        <i class="fa-solid fa-briefcase text-6xl text-gray-800"></i>
        <p class="text-2xl font-bold text-gray-800">No jobs available</p>
        <p class="text-gray-800">Check back soon for new job opportunities</p>
      </div>
    `
    filterSection.appendChild(div)
  } else {
    for (let interview of interviewList) {
      let div = document.createElement('div')
      div.className = 'flex place-content-between p-6 border border-blue-50 bg-white rounded-md'
      div.innerHTML = `
              <div class="space-y-6">
            <div>
              <p class="jobName font-bold text-[20px]">${interview.jobName}</p>
              <p class="category text-gray-400">${interview.category}</p>
            </div>
            <div>
              <p class="type text-gray-400">${interview.type}</p>
            </div>
            <div>
              
              <p class="titel  inline-block text-green-600 bg-green-100 px-2 py-1 rounded">${interview.titel}</p>
            </div>
            <div>
              <p class="description">${interview.description}</p>
            </div>
            <div>
              <button class="btn btn-soft btn-success interviewBtn">Interview</button>
              <button class="btn btn-soft btn-error rejectedBtn">Rejected</button>
            </div>
          </div>

          <div>
            <button class="btn rounded-[99999px] "><i class="fa-solid fa-trash-can"></i></button>
          </div>
      `
      filterSection.appendChild(div)
    }
  }
}

function renderrejected() {
  filterSection.innerHTML = ''

  if (rejectedList.length === 0) {
    let div = document.createElement('div')
    div.className = 'flex flex-col items-center justify-center p-16 border border-blue-50 bg-white rounded-md'
    div.innerHTML = `
      <div class="text-center space-y-4">
        <i class="fa-solid fa-briefcase text-6xl text-gray-800"></i>
        <p class="text-2xl font-bold text-gray-800">No jobs available</p>
        <p class="text-gray-800">Check back soon for new job opportunities</p>
      </div>
    `
    filterSection.appendChild(div)
  } else {
    for (let rejected of rejectedList) {
      let div = document.createElement('div')
      div.className = 'flex place-content-between p-6 border border-blue-50 bg-white rounded-md'
      div.innerHTML = `
              <div class="space-y-6">
            <div>
              <p class="jobName font-bold text-[20px]">${rejected.jobName}</p>
              <p class="category text-gray-400">${rejected.category}</p>
            </div>
            <div>
              <p class="type text-gray-400">${rejected.type}</p>
            </div>
            <div>
              <p class="titel  inline-block text-red-500 bg-red-100 px-2 py-1 rounded">${rejected.titel}</p>
            </div>
            <div>
              <p class="description">${rejected.description}</p>
            </div>
            <div>
              <button class="btn btn-soft btn-success interviewBtn">Interview</button>
              <button class="btn btn-soft btn-error rejectedBtn">Rejected</button>
            </div>
          </div>

          <div>
            <button class="btn rounded-[99999px] "><i class="fa-solid fa-trash-can"></i></button>
          </div>
      `
      filterSection.appendChild(div)
    }
  }
}