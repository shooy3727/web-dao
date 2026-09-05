document.addEventListener("DOMContentLoaded", () => {

  // 1. NĂM SINH
  const birthInput = document.getElementById("birth_year");

  if (birthInput) {

    birthInput.addEventListener("input", () => {

      // Chỉ cho nhập số
      birthInput.value = birthInput.value.replace(/\D/g, "");

      // Tối đa 4 số
      birthInput.value = birthInput.value.slice(0, 4);

    });

    birthInput.addEventListener("blur", () => {

      if (!birthInput.value) return;

      let year = Number(birthInput.value);

      if (year < 1980) {
        year = 1980;
      }

      if (year > 2020) {
        year = 2020;
      }

      birthInput.value = year;

    });

  }


  // 2. GIÁ DỊCH VỤ
  const priceInput = document.getElementById("price");

  if (priceInput) {

    priceInput.addEventListener("input", () => {

      // Chỉ cho nhập số
      priceInput.value = priceInput.value.replace(/\D/g, "");

    });

    priceInput.addEventListener("blur", () => {

      if (!priceInput.value) return;

      let price = Number(priceInput.value);

      // Tối thiểu 200,000
      if (price < 200000) {
        price = 200000;
      }

      // Làm tròn xuống theo bước 50,000
      price = Math.floor(price / 50000) * 50000;

      // Đảm bảo không thấp hơn 200,000
      if (price < 200000) {
        price = 200000;
      }

      // Hiển thị dạng 200,000
      priceInput.value = price.toLocaleString("en-US");

    });

  }

  // 3. SỐ ĐIỆN THOẠI VIỆT NAM
  const phoneInput = document.getElementById("phone");

  if (phoneInput) {

    phoneInput.addEventListener("input", () => {

      // Chỉ cho nhập số
      let phone = phoneInput.value.replace(/\D/g, "");

      // Tối đa 10 số
      phone = phone.slice(0, 10);

      // Nếu nhập số đầu khác 0 thì bỏ
      if (phone.length > 0 && phone[0] !== "0") {
        phone = "";
      }

      phoneInput.value = phone;

    });

  }

});