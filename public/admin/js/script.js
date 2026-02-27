const buttonStatus = document.querySelectorAll('[button-change-status]');
console.log(buttonStatus);
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener('click', () => {
            const status = button.getAttribute('button-status');

            if (status) {
                url.searchParams.set('status', status);
            }
            else {
                url.searchParams.delete('status');
            }

            window.location.href = url.href;
        });
    });
}



const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}

const buttonPagination = document.querySelectorAll('[button-pagination]')
if (buttonPagination) {

    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            let url = new URL(window.location.href);
            const page = button.getAttribute("button-pagination")

            url.searchParams.set("page", page)

            window.location.href = url.href;
        })
    })
}

const checkboxMulti = document.querySelector('[checkbox-multi]');
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        }
        else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

            if (countChecked === inputsId.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;
            }
        })
    })
}

const formChangeMulti = document.querySelector('[form-change-multi]');
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkboxMulti = document.querySelector('[checkbox-multi]');
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;

        if (typeChange === "delete-all") {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn không?");

            if (!isConfirm) {
                return;
            }
        }
        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.value;

                if (typeChange == "change-position") {
                    const postion = input.closest("tr").querySelector("input[name='postion']").value;

                    ids.push(`${id}-${postion}`);

                }
                else {
                    ids.push(id);
                }
            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất 1 bản ghi!");
        }
    })
}

const showAlert = document.querySelector('[show-alert]');
if (showAlert) {
    const time = parseInt(showAlert.getAttribute('data-time'));
    const closeAlert = showAlert.querySelector('[close-alert]');

    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, time)

    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    });
}

const uploadImage = document.querySelector('[upload-image]');
if (uploadImage) {
    const uploadImageInput = document.querySelector('[upload-image-input]');
    const uploadImagePreview = document.querySelector('[upload-image-preview]');

    uploadImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}


const input = document.querySelector("[upload-image-input]");
const preview = document.querySelector("[upload-image-preview]");

if (input && preview) {
    input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file) return;

        preview.src = URL.createObjectURL(file);

        // wrapper
        let wrapper = preview.closest(".image-preview-wrapper");
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.className = "image-preview-wrapper";
            preview.parentNode.insertBefore(wrapper, preview);
            wrapper.appendChild(preview);
        }

        // nút X
        let btn = wrapper.querySelector(".btn-remove-image");
        if (!btn) {
            btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn-remove-image";
            btn.innerHTML = "×";

            btn.addEventListener("click", () => {
                input.value = "";
                preview.src = "";
                btn.remove();
            });

            wrapper.appendChild(btn);
        }
    });
}

const sort = document.querySelector('[sort]');
if (sort) {
    let url = new URL(window.location.href);

    const sortSelect = sort.querySelector('[sort-select]')
    const sortClear = sort.querySelector('[sort-clear]')

    sortSelect.addEventListener('change', (e) => {
        const value = e.target.value
        const [sortKey, sortValue] = value.split("-");

        console.log(sortKey)
        console.log(sortValue)
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)
        window.location.href = url.href

    })

    sortClear.addEventListener('click', () => {
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")

        window.location.href = url.href
    })

    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")
    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`
        const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`);
        optionSelected.selected = true;
    }
}