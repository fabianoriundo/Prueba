// Función para manejar el envío de preguntas por WhatsApp
function initWhatsAppQuestionForm() {
    const textarea = document.getElementById('user-question');
    const whatsappBtn = document.getElementById('whatsapp-question-btn');
    const charCount = document.getElementById('char-count');
    const maxChars = 500;
    
    if (!textarea || !whatsappBtn) return;
    
    // Obtener el nombre del producto de la página actual
    function getCurrentProductName() {
        // Opción 1: Del título de la página
        const pageTitle = document.title;
        
        // Opción 2: Del breadcrumb (ruta de navegación)
        const breadcrumb = document.querySelector('.cascada');
        if (breadcrumb) {
            const breadcrumbLinks = breadcrumb.querySelectorAll('a');
            const lastLink = breadcrumbLinks[breadcrumbLinks.length - 1];
            if (lastLink && lastLink.textContent) {
                return lastLink.textContent.trim();
            }
        }
        
        // Opción 3: Del h2 principal
        const mainHeading = document.querySelector('h2.font-medium');
        if (mainHeading && mainHeading.textContent) {
            // Extraer solo el modelo del producto
            const text = mainHeading.textContent;
            const modelMatch = text.match(/\b(UK-ULTRA|U7-LITE|U7-PRO|U6-LITE|U6-PRO|UAP-AC-\w+)\b/);
            if (modelMatch) {
                return modelMatch[0];
            }
        }
        
        // Opción 4: Del título de la página (fallback)
        const titleMatch = pageTitle.match(/^([^|]+)\s*\|/);
        if (titleMatch) {
            return titleMatch[1].trim();
        }
        
        // Default
        return 'Producto Ubiquiti';
    }
    
    // Contador de caracteres
    textarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = `${currentLength}/${maxChars}`;
        
        // Cambiar color si se acerca al límite
        if (currentLength > maxChars * 0.9) {
            charCount.classList.add('text-red-600', 'font-medium');
            charCount.classList.remove('text-gray-500');
        } else {
            charCount.classList.remove('text-red-600', 'font-medium');
            charCount.classList.add('text-gray-500');
        }
        
        // Habilitar/deshabilitar botón
        if (this.value.trim().length > 0 && this.value.trim().length <= maxChars) {
            whatsappBtn.disabled = false;
            whatsappBtn.classList.remove('disabled:opacity-50', 'disabled:cursor-not-allowed');
        } else {
            whatsappBtn.disabled = true;
            whatsappBtn.classList.add('disabled:opacity-50', 'disabled:cursor-not-allowed');
        }
        
        // Limitar caracteres
        if (currentLength > maxChars) {
            this.value = this.value.substring(0, maxChars);
            charCount.textContent = `${maxChars}/${maxChars}`;
        }
    });
    
    // Enviar por WhatsApp
    whatsappBtn.addEventListener('click', function() {
        const question = textarea.value.trim();
        
        if (!question) {
            showFormError('Por favor, escribe tu pregunta antes de enviar.');
            return;
        }
        
        if (question.length > maxChars) {
            showFormError('La pregunta es demasiado larga. Por favor, acórtala.');
            return;
        }
        
        // Obtener el nombre del producto actual
        const productName = getCurrentProductName();
        
        // Formatear pregunta para URL de WhatsApp
        const formattedQuestion = encodeURIComponent(question);
        const phoneNumber = '937514867'; // Número de WhatsApp de ds3comunicaciones
        
        // Crear mensaje generalizado con producto detectado automáticamente
        const message = `*Consulta sobre ${productName}*\n\nHola DS3 Comunicaciones,\n\nTengo la siguiente consulta sobre el ${productName}:\n\n${question}\n\nSaludos.`;
        const encodedMessage = encodeURIComponent(message);
        
        // URL de WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Mostrar confirmación y resetear
        showFormSuccess(`Redirigiendo a WhatsApp... Tu pregunta sobre ${productName} está lista para enviar.`);
        
        // Opcional: Guardar en localStorage para seguimiento
        try {
            const questionsHistory = JSON.parse(localStorage.getItem('productQuestions') || '[]');
            questionsHistory.push({
                product: productName,
                question: question,
                timestamp: new Date().toISOString(),
                page: window.location.href
            });
            localStorage.setItem('productQuestions', JSON.stringify(questionsHistory.slice(-10))); // Guardar solo últimas 10
        } catch (e) {
            console.log('No se pudo guardar en historial');
        }
        
        // Resetear formulario después de 2 segundos
        setTimeout(() => {
            textarea.value = '';
            charCount.textContent = '0/500';
            whatsappBtn.disabled = true;
        }, 2000);
    });
    
    // Función para mostrar errores
    function showFormError(message) {
        // Crear o mostrar elemento de error
        let errorEl = document.querySelector('.form-error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'form-error-message mt-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm';
            textarea.parentNode.appendChild(errorEl);
        }
        
        errorEl.innerHTML = `<i class="fas fa-exclamation-circle mr-1"></i> ${message}`;
        errorEl.style.display = 'block';
        
        // Animación de shake
        textarea.classList.add('error-shake');
        setTimeout(() => {
            textarea.classList.remove('error-shake');
        }, 500);
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            errorEl.style.display = 'none';
        }, 5000);
    }
    
    // Función para mostrar éxito
    function showFormSuccess(message) {
        let successEl = document.querySelector('.form-success-message');
        if (!successEl) {
            successEl = document.createElement('div');
            successEl.className = 'form-success-message mt-2 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm';
            textarea.parentNode.appendChild(successEl);
        }
        
        successEl.innerHTML = `<i class="fas fa-check-circle mr-1"></i> ${message}`;
        successEl.style.display = 'block';
        
        // Auto-ocultar después de 3 segundos
        setTimeout(() => {
            successEl.style.display = 'none';
        }, 3000);
    }
    
    // Inicializar validación al cargar
    textarea.dispatchEvent(new Event('input'));
}

// Funcionalidad para preguntas frecuentes (acordeón)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar formulario de preguntas WhatsApp
    initWhatsAppQuestionForm();
    
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
    
    // Formulario de preguntas (backup - por si quieren enviar por email)
    const questionForm = document.getElementById('question-form');
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const questionText = document.getElementById('user-question').value;
            
            if (questionText.trim() === '') {
                alert('Por favor, escribe tu pregunta.');
                return;
            }
            
            // Obtener nombre del producto
            const productName = getCurrentProductName();
            
            // Enviar por email como alternativa
            const email = 'netperu100@hotmail.com';
            const subject = `Consulta sobre ${productName}`;
            const body = `Producto: ${productName}\nURL: ${window.location.href}\n\nPregunta:\n${questionText}`;
            
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Abrir cliente de email
            window.location.href = mailtoLink;
        });
    }
    
    // Función auxiliar para obtener nombre del producto (también disponible globalmente)
    window.getCurrentProductName = function() {
        // Opción 1: Del título de la página
        const pageTitle = document.title;
        
        // Opción 2: Del breadcrumb
        const breadcrumb = document.querySelector('.cascada');
        if (breadcrumb) {
            const breadcrumbLinks = breadcrumb.querySelectorAll('a');
            const lastLink = breadcrumbLinks[breadcrumbLinks.length - 1];
            if (lastLink && lastLink.textContent) {
                return lastLink.textContent.trim();
            }
        }
        
        // Opción 3: Del h2 principal
        const mainHeading = document.querySelector('h2.font-medium');
        if (mainHeading && mainHeading.textContent) {
            return mainHeading.textContent.split('|')[0].trim();
        }
        
        // Default
        return 'Producto Ubiquiti';
    };
    
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

// Añadir CSS para la animación de shake (si no existe)
if (!document.querySelector('#error-shake-style')) {
    const style = document.createElement('style');
    style.id = 'error-shake-style';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .error-shake {
            animation: shake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}