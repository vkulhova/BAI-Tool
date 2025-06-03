export const generatePDF = () => {
  try {
    // Отримуємо контент SRS
    const srsContent = document.getElementById('srs-content');
    if (!srsContent) {a
      alert('Помилка: контент SRS не знайдено');
      return;
    }

    // Створюємо нове вікно
    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    
    // Створюємо HTML контент для PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="uk">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Software Requirements Specification - PDF</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            margin: 20mm;
            size: A4;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: white;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          /* Основні класи */
          .bg-gradient-to-br {
            background: linear-gradient(135deg, #f8f4ff 0%, #f3e8ff 25%, #e9d5ff 75%, #e0e7ff 100%);
          }
          
          .p-12 { padding: 3rem; }
          .text-center { text-align: center; }
          .border-b { border-bottom: 1px solid #e5e7eb; }
          
          .max-w-2xl {
            max-width: 42rem;
            margin-left: auto;
            margin-right: auto;
          }
          
          .text-4xl {
            font-size: 2.25rem;
            line-height: 2.5rem;
          }
          
          .font-bold { font-weight: 700; }
          
          .text-gray-800 { color: #1f2937; }
          
          .mb-4 { margin-bottom: 1rem; }
          .leading-tight { line-height: 1.25; }
          
          .w-24 {
            width: 6rem;
            height: 0.25rem;
            background: linear-gradient(to right, #8b5cf6, #a855f7);
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 1.5rem;
            border-radius: 9999px;
          }
          
          .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
          
          .text-gray-600 { color: #4b5563; }
          .mb-8 { margin-bottom: 2rem; }
          .font-medium { font-weight: 500; }
          
          .bg-white\/60 {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
          }
          
          .backdrop-blur-sm { backdrop-filter: blur(4px); }
          .rounded-xl { border-radius: 0.75rem; }
          .p-6 { padding: 1.5rem; }
          .border { border-width: 1px; }
          .border-borderGray2\/30 { border-color: rgba(209, 213, 219, 0.3); }
          .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
          
          .grid { display: grid; }
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .gap-4 { gap: 1rem; }
          .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          
          @media (min-width: 768px) {
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }
          
          .text-violet-600 { color: #7c3aed; }
          .font-semibold { font-weight: 600; }
          .mb-1 { margin-bottom: 0.25rem; }
          
          .text-gray-700 { color: #374151; }
          .font-mono { font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
          
          .inline-flex { display: inline-flex; }
          .items-center { align-items: center; }
          .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
          .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
          .rounded-full { border-radius: 9999px; }
          .text-xs { font-size: 0.75rem; line-height: 1rem; }
          .bg-orange-100 { background-color: #fed7aa; }
          .text-orange-700 { color: #c2410c; }
          
          /* Зміст документу */
          .p-8 { padding: 2rem; }
          
          @media (min-width: 1024px) {
            .lg\\:p-12 { padding: 3rem; }
          }
          
          .mb-12 { margin-bottom: 3rem; }
          .scroll-mt-8 { scroll-margin-top: 2rem; }
          
          .flex { display: flex; }
          .space-x-4 > * + * { margin-left: 1rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .pb-4 { padding-bottom: 1rem; }
          .border-b-2 { border-bottom-width: 2px; }
          .border-violet-200 { border-color: #ddd6fe; }
          
          .w-12 {
            width: 3rem;
            height: 3rem;
          }
          
          .h-12 { height: 3rem; }
          .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
          .from-violet-500 { --tw-gradient-from: #8b5cf6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(139, 92, 246, 0)); }
          .to-purple-600 { --tw-gradient-to: #9333ea; }
          .justify-center { justify-content: center; }
          
          .text-white { color: #ffffff; }
          
          .text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          
          .text-gray-100 { color: #f3f4f6; }
          .text-gray-400 { color: #9ca3af; }
          
          .bg-beige\/40 { background-color: rgba(249, 250, 251, 0.4); }
          
          .space-y-2 > * + * { margin-top: 0.5rem; }
          .space-y-4 > * + * { margin-top: 1rem; }
          .space-y-6 > * + * { margin-top: 1.5rem; }
          
          .block {
            display: block;
            color: #7c3aed;
            text-decoration: none;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
          }
          
          .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
          }
          
          .text-violet-400 { color: #a78bfa; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-3 { margin-bottom: 0.75rem; }
          
          .leading-relaxed { line-height: 1.625; }
          .text-gray-300 { color: #d1d5db; }
          
          .space-y-3 > * + * { margin-top: 0.75rem; }
          .ml-4 { margin-left: 1rem; }
          
          .w-2 {
            width: 0.5rem;
            height: 0.5rem;
          }
          
          .h-2 { height: 0.5rem; }
          .bg-violet-500 { background-color: #8b5cf6; }
          .mt-2 { margin-top: 0.5rem; }
          .flex-shrink-0 { flex-shrink: 0; }
          
          .space-x-3 > * + * { margin-left: 0.75rem; }
          
          /* Data Model Entities */
          .rounded-xl { border-radius: 0.75rem; }
          .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
          
          .text-gray-200 { color: #e5e7eb; }
          
          @media (min-width: 768px) {
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          
          .gap-6 { gap: 1.5rem; }
          .uppercase { text-transform: uppercase; }
          .tracking-wide { letter-spacing: 0.025em; }
          
          .rounded { border-radius: 0.25rem; }
          .space-x-2 > * + * { margin-left: 0.5rem; }
          .p-2 { padding: 0.5rem; }
          
          .p-3 { padding: 0.75rem; }
          .border-l-4 { border-left-width: 4px; }
          .border-orange-500 { border-color: #f97316; }
          
          /* Підписи */
          .border-t { border-top-width: 1px; }
          .border-e5e7eb { border-color: #e5e7eb; }
          .pt-8 { padding-top: 2rem; }
          .mt-8 { margin-top: 2rem; }
          
          .gap-8 { gap: 2rem; }
          
          .bg-gradient-green {
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border-color: #a7f3d0;
          }
          
          .bg-gradient-orange {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            border-color: #fcd34d;
          }
          
          .w-10 {
            width: 2.5rem;
            height: 2.5rem;
          }
          
          .h-10 { height: 2.5rem; }
          .rounded-lg { border-radius: 0.5rem; }
          .mr-3 { margin-right: 0.75rem; }
          
          .bg-green {
            background: linear-gradient(135deg, #10b981, #059669);
          }
          
          .bg-orange {
            background: linear-gradient(135deg, #f59e0b, #d97706);
          }
          
          .text-green-800 { color: #065f46; }
          .text-green-200 { color: #bbf7d0; }
          .text-green-300 { color: #86efac; }
          .text-green-700 { color: #15803d; }
          
          .text-orange-800 { color: #9a3412; }
          .text-orange-200 { color: #fed7aa; }
          .text-orange-300 { color: #fdba74; }
          .text-orange-700 { color: #c2410c; }
          
          /* Specific element styling */
          section { page-break-inside: avoid; }
          .entity-card { page-break-inside: avoid; }
          h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
          
          /* Print specific styles */
          @media print {
            body {
              margin: 0;
              padding: 0;
              background: white !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .bg-gradient-to-br {
              page-break-after: always;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .mb-12:first-of-type {
              page-break-after: always;
            }
            
            .mb-12 {
              page-break-inside: avoid;
              margin-bottom: 1.5rem;
            }
            
            .border-b-2 {
              page-break-after: avoid;
            }
            
            .space-y-6 > div {
              page-break-inside: avoid;
            }
            
            .border-t {
              page-break-before: auto;
            }
          }
        </style>
      </head>
      <body>
        <div class="pdf-container">
          ${srsContent.innerHTML}
        </div>
        
        <script>
          window.onload = function() {
            // Невелика затримка для завантаження стилів
            setTimeout(function() {
              window.print();
              // Опціонально: закрити вікно після друку
              // window.onafterprint = function() {
              //   window.close();
              // };
            }, 2000);
          };
        </script>
      </body>
      </html>
    `;

    // Записуємо HTML у нове вікно
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
  } catch (error) {
    console.error('Помилка при створенні PDF:', error);
    alert('Помилка при створенні PDF. Спробуйте знову.');
  }
}; 