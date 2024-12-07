/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 
*/

const navBarList = document.body.querySelector('#navbar__list');

// console.log(navBarList);

const allSections = document.body.querySelectorAll('section');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Add class 'active' to section when near top of viewport
const AddActiveClass = (section)=>{
    section.classList.add('your-active-class');
    // set a background color for your active class
    section.setAttribute('style','background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 100%);');  

}

// removing the your-active-class
const removeActiveClass = (section) => {
    section.classList.remove('your-active-class');
    // set the default color by CSS file on your active calss
    section.setAttribute('style','background: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);');    
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav

// loop to all sections in allSections global variable
allSections.forEach(section=>{
    // create a nav bar like button but it's a list 
    const navBarButton = document.createElement('li');
    // but the needed data inside the nav bar button
    navBarButton.innerHTML =`<a class="menu__link" href=#${section.id}>${section.dataset.nav}</a>`;
    
    // append that nav bar button to the overall list 
    navBarList.appendChild(navBarButton);
    
})

navBarList.setAttribute('style','background-color:#F2F0EF');


// go to near top of the section 
const topOfSection = (section) =>{

   return Math.floor(section.getBoundingClientRect().top);

}

// adding the your-active-class

// toggling throw the section's class 
const sectionClassActivation = ()=>{
    allSections.forEach(section =>{
     // save the value of the top to a const to determine if it's in the viewport
        const sectionTop = topOfSection(section);
    // my logic to discover if it's in the viewport i've tried these values and i found them pretty good
        const IsInView = 300 > sectionTop && sectionTop>=-180;
    // if it's in the view add the class other than that remove it 
        IsInView?AddActiveClass(section):removeActiveClass(section);
    
    })   
};
// window is the object model that deals with scroll i tried document and it didn't work
window.addEventListener('scroll',sectionClassActivation);

// Scroll to anchor ID using scrollTO event

// slelecting all the sections in the navbar
navBarSectionsAnchor = document.body.querySelectorAll('#navbar__list a');


/**
 * End Main Functions
 * Begin Events
 * 
*/



// Build menu 
navBarSectionsAnchor.forEach(anchor =>{
    anchor.addEventListener('click',(evt)=>{
        evt.preventDefault(); //prevent the default act on anchors in the navBar

         // get the #href from the anchor
        const Link = document.querySelector(anchor.hash);

        // scrolling method srollIntoView       
        // Scroll to section on link click 
        // Set sections as active
        Link.scrollIntoView({
                behavior: 'smooth',  // Smooth scrolling by mdn
                  
            });

        
    })
})

// Highlight the active section in the navigation bar
navBarList.addEventListener('click',(event)=>{
        // select all the sections in the nav bar
        const navBarSections = navBarList.querySelectorAll('.menu__link');
        // loop over them and set them to default [i coded that because i don't want the sections to hold there props after clicking on another section]
        navBarSections.forEach(navBarSection=>navBarSection.setAttribute('style',"background-color:'';color:''"));
        // set the clicked section props only 
        event.target.setAttribute('style','background-color:#333;color:white');

})   


