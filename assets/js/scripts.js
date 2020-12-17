$(document).ready(function () {
    $("div[id^='portfolioModal']").each(function () {
        var currentModal = $(this);
        //click next
        currentModal.find('.next').click(function () {
            currentModal.modal('hide');
            //            console.log(currentModal.closest());
            currentModal.nextAll("div[id^='portfolioModal']").first().modal('show');
        });

        //click prev
        currentModal.find('.prev').click(function () {
            currentModal.modal('hide');
            //            console.log(currentModal.closest("div[id^='portfolioModal']"));
            currentModal.prevAll("div[id^='portfolioModal']").first().modal('show');
        });
    });
});
