const signUpUserNameEle = document.getElementById("userName");
const signUpEmailEle = document.getElementById("email");
const signUpPasswordEle = document.getElementById("password");
const signUpCPasswordEle = document.getElementById("conformationPassword");
const signUpDateEle = document.getElementById("dateOfBirth");
const termsAConditionsEle = document.getElementById("termsConditons");
const signUpBtnEle = document.querySelector("#signup_btn");
const signUpMessageEle = document.querySelector(".form_message_signup")
const signInMessageEle = document.querySelector(".form_message_signin");
const signInModel = document.querySelector(".sign_in_model");
const signupFormEle = document.querySelector(".signupForm");
const signInFormEle = document.querySelector(".signinForm");
const signInBtnEle = document.getElementById("signin_btn");
const signInUserNameEle = document.getElementById("signIn_userName");
const signInUserEmailEle = document.getElementById("signIn_email");
const signInUserPasswordEle = document.getElementById("signIn_password");
const loginUserNav = document.querySelector(".login_user");
const blogModelBtnEle = document.getElementById("blog_model_btn")
const addBlocksSecEle = document.getElementById("allBlogs")


let signUpUsers = JSON.parse(localStorage.getItem("users")) || [];
let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");


function addingBlog() {
    signUpUsers = JSON.parse(localStorage.getItem("users")) || [];
    currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");


    const allBlogs = JSON.parse(localStorage.getItem("blogs") || "[]")


    if (currentLoginUser.userName && allBlogs) {
        addBlocksSecEle.innerHTML = ""

        const loginUserBlogs = allBlogs.filter((b) => (
            b.userName === currentLoginUser.userName
        ))

        for (let i = 0; i < loginUserBlogs.length; i++) {

            const br = document.createElement('br')
            const editBtn = document.createElement("button")
            editBtn.classList.add("btn", "btn-secondary", "btn-sm")
            editBtn.setAttribute("data-bs-toggle", "modal")
            editBtn.setAttribute("data-bs-whatever", "@mdo")
            editBtn.setAttribute("data-bs-target", "#exampleModal")
            editBtn.setAttribute("data-id", loginUserBlogs[i].id)


            const deleteBtn = document.createElement("button")
            deleteBtn.classList.add("btn", "btn-danger", "btn-sm")
            deleteBtn.style.marginRight = "20px"
            deleteBtn.setAttribute("data-id", loginUserBlogs[i].id)

            const divCardFooter = document.createElement("div")
            divCardFooter.classList.add("card-footer")
            editBtn.innerText = "Edit"
            deleteBtn.innerText = "Delete"

            divCardFooter.append(deleteBtn)
            divCardFooter.appendChild(editBtn)

            const divCard = document.createElement("div")
            divCard.classList.add("card", "individual_blog")

            const divImg = document.createElement("div")
            divImg.classList.add("img_wrapper")

            const img = document.createElement("img")
            img.src = loginUserBlogs[i].imgUrl

            img.setAttribute("alt", "blogImg")
            divImg.append(img)

            const spanEleUserName = document.createElement("span")
            const spanDateEle = document.createElement("span")

            spanEleUserName.style.fontSize = "12px"
            spanEleUserName.style.color = "gray"
            spanEleUserName.innerText = ` Author: ${loginUserBlogs[i].userName}`
            spanDateEle.style.fontSize = "12px"
            spanDateEle.style.color = "gray"
            spanDateEle.innerText = ` Date: ${loginUserBlogs[i].blogDate}`

            const divCardBody = document.createElement("div")
            divCardBody.classList.add("card-body")
            const h5CardHeading = document.createElement("h5")
            h5CardHeading.classList.add("card-title")
            h5CardHeading.innerText = loginUserBlogs[i].blogHeading
            h5CardHeading.append(br)
            h5CardHeading.appendChild(spanEleUserName)
            h5CardHeading.appendChild(spanDateEle)

            const pCardContent = document.createElement("p")
            pCardContent.classList.add("card-text")
            pCardContent.innerText = loginUserBlogs[i].blogContent
            divCardBody.append(h5CardHeading, pCardContent)

            divCard.append(divImg)
            divCard.appendChild(divCardBody)
            divCard.appendChild(divCardFooter)

            addBlocksSecEle.append(divCard)

            deleteBtn.onclick = function (e) {

                const deleteId = e.target.getAttribute("data-id")
                const filterBlogs = allBlogs.filter((b) => {
                    return b.id !== deleteId
                })
                localStorage.removeItem("blogs")
                localStorage.setItem("blogs",JSON.stringify(filterBlogs))
                addingBlog()
            }

        }

    }
    else {
        addBlocksSecEle.innerHTML = ""

        for (let i = 0; i < allBlogs.length; i++) {

            const divCard = document.createElement("div")
            divCard.classList.add("card", "individual_blog")
            const br = document.createElement('br')

            const divImg = document.createElement("div")
            divImg.classList.add("img_wrapper")

            const img = document.createElement("img")
            img.src = allBlogs[i].imgUrl

            img.setAttribute("alt", "blogImg")
            divImg.append(img)

            const spanEleUserName = document.createElement("span")
            const spanDateEle = document.createElement("span")

            spanEleUserName.style.fontSize = "12px"
            spanEleUserName.style.color = "gray"
            spanEleUserName.innerText = ` Author: ${allBlogs[i].userName}`
            spanDateEle.style.fontSize = "12px"
            spanDateEle.style.color = "gray"
            spanDateEle.innerText = ` Date: ${allBlogs[i].blogDate}`

            const divCardBody = document.createElement("div")
            divCardBody.classList.add("card-body")
            const h5CardHeading = document.createElement("h5")
            h5CardHeading.classList.add("card-title")
            h5CardHeading.innerText = allBlogs[i].blogHeading
            h5CardHeading.append(br)
            h5CardHeading.appendChild(spanEleUserName)
            h5CardHeading.appendChild(spanDateEle)

            const pCardContent = document.createElement("p")
            pCardContent.classList.add("card-text")
            pCardContent.innerText = allBlogs[i].blogContent
            divCardBody.append(h5CardHeading, pCardContent)

            divCard.append(divImg)
            divCard.appendChild(divCardBody)

            addBlocksSecEle.append(divCard)
        }
    }
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie =
        name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split("; ");
    for (let c of cookies) {
        const [key, value] = c.split("=");
        if (key === name) return value;
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

signInMessageEle.style.color = "red";
signUpMessageEle.style.color = "red"

if (currentLoginUser.userName) {
    loginUserNav.textContent = currentLoginUser.userName;
    signInModel.classList.add("active_ele");
    blogModelBtnEle.classList.remove("active_ele")

}

signUpBtnEle.addEventListener("click", function (e) {
    e.preventDefault();

    const userName = signUpUserNameEle.value;
    const email = signUpEmailEle.value;
    const password = signUpPasswordEle.value;
    const cPassword = signUpCPasswordEle.value;
    const dateOfBirth = signUpDateEle.value;

    if (!userName || !password || !cPassword || !email || !dateOfBirth) {
        signUpMessageEle.textContent = "Please Enter All Fields";
        return;
    }

    if (!termsAConditionsEle.checked) {
        signUpMessageEle.textContent = "Please Accept Terms & Conditions.";
        return;
    }

    if (password !== cPassword) {
        signUpMessageEle.textContent = "Password and Confirm Password doesn't match";
        return;
    }

    const emailExists = signUpUsers.some((user) => user.email === email);

    if (emailExists) {
        signUpMessageEle.textContent = "Email is already taken";
        return;
    }

    signInModel.classList.add("active_ele");

    signUpUsers.push({ userName, email, password, dateOfBirth });
    localStorage.setItem("users", JSON.stringify(signUpUsers));

    deleteCookie("loginUser");
    setCookie(
        "loginUser",
        JSON.stringify({ userName, email, password, dateOfBirth }),
        7
    );
    let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");

    loginUserNav.textContent = currentLoginUser.userName;
    blogModelBtnEle.classList.remove("active_ele")
    signupFormEle.reset();
    addingBlog()

    signUpMessageEle.style.color = "green";
    signUpMessageEle.textContent = "✅ Signup successful!";
    return;
});

signInBtnEle.addEventListener("click", function (e) {

    e.preventDefault();

    const userName = signInUserNameEle.value;
    const email = signInUserEmailEle.value;
    const password = signInUserPasswordEle.value;

    if (!userName || !email || !password) {
        signInMessageEle.style.color = "red"
        signInMessageEle.textContent =
            "Please enter all fields.";
        return;
    }

    const user = signUpUsers.find(
        (u) => u.email === email && u.password === password
    );
    if (!user) {
        signInMessageEle.textContent = "User Not Found";

    }

    if (user.password !== password) {
        signInMessageEle.style.color = "red"
        signInMessageEle.textContent =
            "Invalid credientials.";
        return;
    }

    deleteCookie("loginUser");
    setCookie("loginUser", JSON.stringify({ userName: user.userName, email: user.email, password: user.password }), 7);
    let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
    loginUserNav.textContent = currentLoginUser.userName;

    signInFormEle.reset();
    signInModel.classList.add("active_ele");
    loginUserNav.classList.remove("active_ele")
    loginUserNav.textContent = currentLoginUser.userName
    blogModelBtnEle.classList.remove("active_ele")
    addingBlog()

    signInMessageEle.style.color = "green";
    signInMessageEle.textContent = `✅ Welcome back, ${user.userName}!`;

    return;
});

loginUserNav.addEventListener("click", function () {
    deleteCookie("loginUser");
    let currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
    if (!currentLoginUser.userName) {
        loginUserNav.textContent = "";
        signInModel.classList.remove("active_ele");
        blogModelBtnEle.classList.add("active_ele")
        signUpMessageEle.textContent = ""
        signUpMessageEle.textContent = ""
        addingBlog()
    }
    return;
});


blogModelBtnEle.addEventListener("click", function (e) {
    currentLoginUser = JSON.parse(getCookie("loginUser") || "{}");
    e.preventDefault()

    const blogHeadingEle = document.getElementById("blog_heading")
    const blogContentEle = document.getElementById("blog_text")
    const addBlogBtnEle = document.getElementById("addBlog")
    const blogImgInputEle = document.getElementById("blog_img")
    const blogFormEle = document.getElementById("blog_form")
    let imgUrl

    blogImgInputEle.addEventListener("change", (e) => {
        imgUrl = URL.createObjectURL(blogImgInputEle.files[0])
    })



    addBlogBtnEle.onclick = function (e) {

        e.preventDefault()

        const id = crypto.randomUUID();

        const blogHeading = blogHeadingEle.value
        const blogContent = blogContentEle.value
        const date = new Date()
        const m = date.getMonth()
        const d = date.getDay()
        const y = date.getFullYear()
        const blogDate = ` ${d}/${m}/${y}`
        const myBlogs = JSON.parse(localStorage.getItem("blogs") || "[]")
        myBlogs.push({ id, userName: currentLoginUser.userName, blogDate, blogHeading, blogContent, imgUrl })

        localStorage.removeItem("blogs")
        localStorage.setItem("blogs", JSON.stringify(myBlogs))
        addBlocksSecEle.innerHTML = ""
        addingBlog()
        blogFormEle.reset()
    }
})

addingBlog()
