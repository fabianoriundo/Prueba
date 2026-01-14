// Funcionalidad para preguntas frecuentes (acordeón)
        document.addEventListener('DOMContentLoaded', function() {
            // Acordeón FAQ
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const icon = question.querySelector('i');
                    
                    // Cerrar otras respuestas
                    document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                        if (otherAnswer !== answer && otherAnswer.classList.contains('active')) {
                            otherAnswer.classList.remove('active');
                            otherAnswer.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Alternar respuesta actual
                    answer.classList.toggle('active');
                    
                    // Animación del ícono
                    if (answer.classList.contains('active')) {
                        icon.style.transform = 'rotate(180deg)';
                        answer.style.display = 'block';
                        setTimeout(() => {
                            answer.style.opacity = '1';
                        }, 10);
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                        answer.style.opacity = '0';
                        setTimeout(() => {
                            answer.style.display = 'none';
                        }, 300);
                    }
                });
            });
            
            // Formulario de preguntas (ejemplo básico)
            const questionForm = document.getElementById('question-form');
            if (questionForm) {
                questionForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const questionText = document.getElementById('user-question').value;
                    
                    if (questionText.trim() === '') {
                        alert('Por favor, escribe tu pregunta.');
                        return;
                    }
                    
                    // Aquí normalmente enviarías a un servidor
                    // Por ahora solo mostraremos un mensaje
                    alert('¡Gracias por tu pregunta! Nuestro equipo técnico te responderá pronto.\n\nPuedes contactarnos también por WhatsApp para una respuesta más rápida.');
                    
                    // Resetear formulario
                    this.reset();
                    
                    // Opcional: Enviar por email (requiere backend)
                    // window.location.href = `mailto:netperu100@hotmail.com?subject=Consulta sobre U7-LITE&body=${encodeURIComponent(questionText)}`;
                });
            }
            
            // Inicializar plugin de Facebook si aún no está cargado
            if (typeof FB !== 'undefined') {
                FB.XFBML.parse();
            }
        });
        
        // Forzar recarga del plugin Facebook si hay problemas
        function reloadFacebookComments() {
            if (typeof FB !== 'undefined') {
                FB.XFBML.parse();
            }
        }
        
        // Recargar comentarios cuando la página esté completamente cargada
        window.addEventListener('load', function() {
            setTimeout(reloadFacebookComments, 1000);
        });