$(document).ready(function () {
   // Estilo do hover de uma estrela
   $('#optradio-label1').hover(function () {
      $('#optradio-label1').removeClass('fa-star-o');
      $('#optradio-label1').addClass('fa-star text-warning');
   }, function (){
      $('#optradio-label1').removeClass('fa-star text-warning');
      $('#optradio-label1').addClass('fa-star-o');
   });

   // Estilo do hover de duas estrelas
   $('#optradio-label2').hover(function () {
      $('#optradio-label1').removeClass('fa-star-o');
      $('#optradio-label1').addClass('fa-star text-warning');
      $('#optradio-label2').removeClass('fa-star-o');
      $('#optradio-label2').addClass('fa-star text-warning');
   }, function (){
      $('#optradio-label1').removeClass('fa-star text-warning');
      $('#optradio-label1').addClass('fa-star-o');
      $('#optradio-label2').removeClass('fa-star text-warning');
      $('#optradio-label2').addClass('fa-star-o');
   });

   // Estilo do hover de tres estrelas
   $('#optradio-label3').hover(function () {
      $('#optradio-label1').removeClass('fa-star-o');
      $('#optradio-label1').addClass('fa-star text-warning');
      $('#optradio-label2').removeClass('fa-star-o');
      $('#optradio-label2').addClass('fa-star text-warning');
      $('#optradio-label3').removeClass('fa-star-o');
      $('#optradio-label3').addClass('fa-star text-warning');
   }, function (){
      $('#optradio-label1').removeClass('fa-star text-warning');
      $('#optradio-label1').addClass('fa-star-o');
      $('#optradio-label2').removeClass('fa-star text-warning');
      $('#optradio-label2').addClass('fa-star-o');
      $('#optradio-label3').removeClass('fa-star text-warning');
      $('#optradio-label3').addClass('fa-star-o');
   });

   // Estilo do hover de quatro estrelas
   $('#optradio-label4').hover(function () {
      $('#optradio-label1').removeClass('fa-star-o');
      $('#optradio-label1').addClass('fa-star text-warning');
      $('#optradio-label2').removeClass('fa-star-o');
      $('#optradio-label2').addClass('fa-star text-warning');
      $('#optradio-label3').removeClass('fa-star-o');
      $('#optradio-label3').addClass('fa-star text-warning');
      $('#optradio-label4').removeClass('fa-star-o');
      $('#optradio-label4').addClass('fa-star text-warning');
   }, function (){
      $('#optradio-label1').removeClass('fa-star text-warning');
      $('#optradio-label1').addClass('fa-star-o');
      $('#optradio-label2').removeClass('fa-star text-warning');
      $('#optradio-label2').addClass('fa-star-o');
      $('#optradio-label3').removeClass('fa-star text-warning');
      $('#optradio-label3').addClass('fa-star-o');
      $('#optradio-label4').removeClass('fa-star text-warning');
      $('#optradio-label4').addClass('fa-star-o');
   });

   // Estilo do hover de quatro estrelas
   $('#optradio-label5').hover(function () {
      $('#optradio-label1').removeClass('fa-star-o');
      $('#optradio-label1').addClass('fa-star text-warning');
      $('#optradio-label2').removeClass('fa-star-o');
      $('#optradio-label2').addClass('fa-star text-warning');
      $('#optradio-label3').removeClass('fa-star-o');
      $('#optradio-label3').addClass('fa-star text-warning');
      $('#optradio-label4').removeClass('fa-star-o');
      $('#optradio-label4').addClass('fa-star text-warning');
      $('#optradio-label5').removeClass('fa-star-o');
      $('#optradio-label5').addClass('fa-star text-warning');
   }, function (){
      $('#optradio-label1').removeClass('fa-star text-warning');
      $('#optradio-label1').addClass('fa-star-o');
      $('#optradio-label2').removeClass('fa-star text-warning');
      $('#optradio-label2').addClass('fa-star-o');
      $('#optradio-label3').removeClass('fa-star text-warning');
      $('#optradio-label3').addClass('fa-star-o');
      $('#optradio-label4').removeClass('fa-star text-warning');
      $('#optradio-label4').addClass('fa-star-o');
      $('#optradio-label5').removeClass('fa-star text-warning');
      $('#optradio-label5').addClass('fa-star-o');
   });
});