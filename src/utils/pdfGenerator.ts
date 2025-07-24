import jsPDF from 'jspdf';
import { DietPlan } from '@/types';
import { calculateDailyNutrition } from './dietPlans';

// Color palette for beautiful PDFs
const colors = {
  primary: '#6366f1',
  secondary: '#f59e0b',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  dark: '#1f2937',
  gray: '#6b7280',
  lightGray: '#f3f4f6',
  white: '#ffffff'
};

/**
 * Generate beautiful diet plan PDF like a professional book/prospectus
 */
export function generateDietPlanPDF(dietPlan: DietPlan): void {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;
  let currentPage = 1;

  // Helper function to add page header
  const addPageHeader = (title: string, pageNum: number) => {
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(colors.gray);
    pdf.text(title, margin, 15);
    pdf.text(`Page ${pageNum}`, pageWidth - margin, 15, { align: 'right' });

    // Header line
    pdf.setDrawColor(colors.primary);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 18, pageWidth - margin, 18);
  };

  // Helper function to add new page with header
  const addNewPage = (title: string) => {
    pdf.addPage();
    currentPage++;
    yPosition = margin + 25;
    addPageHeader(title, currentPage);
  };

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace: number, title: string) => {
    if (yPosition + requiredSpace > pageHeight - margin - 30) {
      addNewPage(title);
    }
  };



  // === COVER PAGE ===
  yPosition = margin + 40;

  // Cover title
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text('PERSONALIZED', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 20;
  pdf.setFontSize(32);
  pdf.text('DIET PLAN', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 30;
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(colors.gray);
  pdf.text('Your Complete Nutrition Guide', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 40;

  // Cover design box
  const boxY = yPosition;
  pdf.setFillColor(colors.lightGray);
  pdf.rect(margin + 20, boxY, contentWidth - 40, 80, 'F');
  pdf.setDrawColor(colors.primary);
  pdf.setLineWidth(2);
  pdf.rect(margin + 20, boxY, contentWidth - 40, 80);

  // Plan details on cover
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.dark);
  pdf.text(dietPlan.name, pageWidth / 2, boxY + 25, { align: 'center' });

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Target: ${dietPlan.targetCalories} calories per day`, pageWidth / 2, boxY + 45, { align: 'center' });

  const nutrition = calculateDailyNutrition(dietPlan.meals);
  pdf.text(`Daily Nutrition: ${nutrition.protein}g protein, ${nutrition.carbs}g carbs, ${nutrition.fat}g fat`, pageWidth / 2, boxY + 65, { align: 'center' });

  // Footer on cover
  yPosition = pageHeight - 60;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(colors.gray);
  pdf.text('Age Calculator', pageWidth / 2, yPosition, { align: 'center' });
  pdf.text('Developed by Md. Farhan Sadik', pageWidth / 2, yPosition + 15, { align: 'center' });
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition + 30, { align: 'center' });

  // === TABLE OF CONTENTS PAGE ===
  addNewPage('Table of Contents');
  yPosition += 20;

  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text('TABLE OF CONTENTS', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 30;

  // TOC entries
  const tocEntries = [
    { title: 'Chapter 1: Nutrition Overview', page: 3 },
    { title: 'Chapter 2: Daily Guidelines', page: 4 },
    { title: 'Chapter 3: Meal Plans', page: 5 },
    { title: 'Chapter 4: Breakfast Recipes', page: 6 },
    { title: 'Chapter 5: Lunch Recipes', page: 7 },
    { title: 'Chapter 6: Dinner Recipes', page: 8 },
    { title: 'Chapter 7: Snack Ideas', page: 9 },
    { title: 'Appendix: Important Notes', page: 10 }
  ];

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(colors.dark);

  tocEntries.forEach((entry, index) => {
    const entryY = yPosition + (index * 20);
    pdf.text(entry.title, margin + 10, entryY);

    // Dotted line
    const dots = '.'.repeat(Math.floor((contentWidth - 100) / 3));
    pdf.setTextColor(colors.gray);
    pdf.text(dots, margin + 120, entryY);

    // Page number
    pdf.setTextColor(colors.dark);
    pdf.text(entry.page.toString(), pageWidth - margin - 10, entryY, { align: 'right' });
  });

  // === CHAPTER 1: NUTRITION OVERVIEW ===
  addNewPage('Chapter 1: Nutrition Overview');
  yPosition += 10;

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text('CHAPTER 1', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(18);
  pdf.text('Nutrition Overview', margin, yPosition);
  yPosition += 25;

  // Nutrition summary table
  const nutritionTableY = yPosition;
  pdf.setFillColor(colors.lightGray);
  pdf.rect(margin, nutritionTableY, contentWidth, 80, 'F');
  pdf.setDrawColor(colors.primary);
  pdf.setLineWidth(1);
  pdf.rect(margin, nutritionTableY, contentWidth, 80);

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text('Daily Nutrition Summary', margin + 10, nutritionTableY + 20);

  // Nutrition values
  const nutritionData = [
    ['Calories', `${nutrition.calories}`],
    ['Protein', `${nutrition.protein}g`],
    ['Carbohydrates', `${nutrition.carbs}g`],
    ['Fat', `${nutrition.fat}g`],
    ['Fiber', `${nutrition.fiber}g`]
  ];

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(colors.dark);

  nutritionData.forEach((item, index) => {
    const itemY = nutritionTableY + 35 + (index * 8);
    pdf.text(`${item[0]}:`, margin + 20, itemY);
    pdf.setFont('helvetica', 'bold');
    pdf.text(item[1], margin + 100, itemY);
    pdf.setFont('helvetica', 'normal');
  });

  yPosition += 100;

  // === CHAPTER 2: DIETARY GUIDELINES ===
  addNewPage('Chapter 2: Dietary Guidelines');
  yPosition += 10;

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text('CHAPTER 2', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(18);
  pdf.text('Dietary Guidelines', margin, yPosition);
  yPosition += 25;

  // Guidelines
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(colors.dark);

  dietPlan.guidelines.forEach((guideline, index) => {
    checkPageBreak(20, 'Chapter 2: Dietary Guidelines');
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}.`, margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(guideline, contentWidth - 20);
    pdf.text(lines, margin + 15, yPosition);
    yPosition += lines.length * 6 + 10;
  });

  // Restrictions (if any)
  if (dietPlan.restrictions && dietPlan.restrictions.length > 0) {
    yPosition += 20;
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.error);
    pdf.text('⚠️ IMPORTANT RESTRICTIONS', margin, yPosition);
    yPosition += 20;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(colors.dark);

    dietPlan.restrictions.forEach((restriction, index) => {
      checkPageBreak(20, 'Chapter 2: Dietary Guidelines');
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}.`, margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      const lines = pdf.splitTextToSize(restriction, contentWidth - 20);
      pdf.text(lines, margin + 15, yPosition);
      yPosition += lines.length * 6 + 10;
    });
  }

  // === CHAPTER 3: MEAL PLANS OVERVIEW ===
  addNewPage('Chapter 3: Meal Plans Overview');
  yPosition += 10;

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text('CHAPTER 3', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(18);
  pdf.text('Daily Meal Plans', margin, yPosition);
  yPosition += 25;

  // Meal overview
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;
  const mealIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍎' };
  const chapterNumbers = { breakfast: 4, lunch: 5, dinner: 6, snack: 7 };

  mealTypes.forEach(mealType => {
    const meals = dietPlan.meals.filter(meal => meal.type === mealType);

    if (meals.length > 0) {
      const meal = meals[0];

      // Meal overview box
      const boxY = yPosition;
      pdf.setFillColor(colors.lightGray);
      pdf.rect(margin, boxY, contentWidth, 40, 'F');
      pdf.setDrawColor(colors.primary);
      pdf.rect(margin, boxY, contentWidth, 40);

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.primary);
      pdf.text(`${mealIcons[mealType]} ${mealType.toUpperCase()}`, margin + 10, boxY + 15);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.dark);
      pdf.text(meal.name, margin + 10, boxY + 28);

      pdf.setFontSize(10);
      pdf.setTextColor(colors.gray);
      pdf.text(`${meal.calories} calories`, pageWidth - margin - 10, boxY + 15, { align: 'right' });
      pdf.text(`See Chapter ${chapterNumbers[mealType]}`, pageWidth - margin - 10, boxY + 28, { align: 'right' });

      yPosition += 50;
    }
  });

  // === INDIVIDUAL MEAL CHAPTERS ===
  mealTypes.forEach(mealType => {
    const meals = dietPlan.meals.filter(meal => meal.type === mealType);

    if (meals.length > 0) {
      const meal = meals[0];
      const chapterNum = chapterNumbers[mealType];

      addNewPage(`Chapter ${chapterNum}: ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Recipe`);
      yPosition += 10;

      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.primary);
      pdf.text(`CHAPTER ${chapterNum}`, margin, yPosition);
      yPosition += 15;

      pdf.setFontSize(18);
      pdf.text(`${mealIcons[mealType]} ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Recipe`, margin, yPosition);
      yPosition += 25;

      // Recipe title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.dark);
      pdf.text(meal.name, margin, yPosition);
      yPosition += 20;

      // Calories info
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.primary);
      pdf.text(`Calories per serving: ${meal.calories}`, margin, yPosition);
      yPosition += 25;

      // Ingredients section
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.secondary);
      pdf.text('INGREDIENTS', margin, yPosition);
      yPosition += 15;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.dark);

      meal.ingredients.forEach((ingredient) => {
        checkPageBreak(15, `Chapter ${chapterNum}: ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Recipe`);
        pdf.text(`• ${ingredient}`, margin + 10, yPosition);
        yPosition += 12;
      });

      yPosition += 10;

      // Instructions section
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.secondary);
      pdf.text('INSTRUCTIONS', margin, yPosition);
      yPosition += 15;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.dark);

      meal.instructions.forEach((instruction, index) => {
        checkPageBreak(20, `Chapter ${chapterNum}: ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Recipe`);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}.`, margin, yPosition);
        pdf.setFont('helvetica', 'normal');
        const lines = pdf.splitTextToSize(instruction, contentWidth - 20);
        pdf.text(lines, margin + 15, yPosition);
        yPosition += lines.length * 6 + 8;
      });

      yPosition += 15;

      // Nutrition information
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.success);
      pdf.text('NUTRITION INFORMATION', margin, yPosition);
      yPosition += 15;

      const nutritionBoxY = yPosition;
      pdf.setFillColor(colors.lightGray);
      pdf.rect(margin, nutritionBoxY, contentWidth, 30, 'F');
      pdf.setDrawColor(colors.success);
      pdf.rect(margin, nutritionBoxY, contentWidth, 30);

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.dark);

      const nutritionInfo = [
        `Protein: ${meal.nutritionInfo.protein}g`,
        `Carbohydrates: ${meal.nutritionInfo.carbs}g`,
        `Fat: ${meal.nutritionInfo.fat}g`,
        `Fiber: ${meal.nutritionInfo.fiber}g`
      ];

      nutritionInfo.forEach((info, index) => {
        const x = margin + 10 + (index % 2) * (contentWidth / 2);
        const y = nutritionBoxY + 12 + Math.floor(index / 2) * 12;
        pdf.text(info, x, y);
      });

      yPosition += 40;
    }
  });

  // Beautiful footer
  const footerY = pageHeight - 40;

  // Footer background
  pdf.setFillColor(colors.dark);
  pdf.rect(0, footerY, pageWidth, 40, 'F');

  // Footer content
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.white);
  pdf.text('Age Calculator', pageWidth / 2, footerY + 12, { align: 'center' });

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Consult with healthcare professionals for personalized advice.', pageWidth / 2, footerY + 22, { align: 'center' });

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(colors.gray);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()} | Developed by Md. Farhan Sadik`, pageWidth / 2, footerY + 32, { align: 'center' });

  // === APPENDIX ===
  addNewPage('Appendix: Important Notes');
  yPosition += 10;

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text('APPENDIX', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(18);
  pdf.text('Important Notes & Disclaimers', margin, yPosition);
  yPosition += 25;

  const disclaimers = [
    'This diet plan is for general guidance only and should not replace professional medical advice.',
    'Consult with a registered dietitian or healthcare provider before starting any new diet plan.',
    'Individual nutritional needs may vary based on age, gender, activity level, and health conditions.',
    'If you have any food allergies or medical conditions, please modify the plan accordingly.',
    'Stay hydrated by drinking at least 8 glasses of water daily.',
    'Regular physical activity is recommended alongside this diet plan.',
    'Monitor your progress and adjust portions as needed to meet your goals.'
  ];

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(colors.dark);

  disclaimers.forEach((disclaimer, index) => {
    checkPageBreak(20, 'Appendix: Important Notes');
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}.`, margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(disclaimer, contentWidth - 20);
    pdf.text(lines, margin + 15, yPosition);
    yPosition += lines.length * 6 + 10;
  });

  // Download the PDF
  const fileName = `${dietPlan.name.replace(/\s+/g, '_').toLowerCase()}_diet_plan_book.pdf`;
  pdf.save(fileName);
}

/**
 * Generate beautiful BMI report PDF
 */
export function generateBMIReportPDF(bmiData: {
  bmi: number;
  category: string;
  healthyWeightRange: { min: number; max: number };
  recommendations: string[];
  weight: number;
  height: number;
  unit: string;
}): void {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper functions (reuse from diet plan)
  const addDecorativeBorder = () => {
    pdf.setDrawColor(colors.primary);
    pdf.setLineWidth(2);
    pdf.rect(margin - 5, margin - 5, contentWidth + 10, pageHeight - 2 * margin + 10);

    const cornerSize = 8;
    pdf.setFillColor(colors.primary);
    pdf.rect(margin - 5, margin - 5, cornerSize, cornerSize, 'F');
    pdf.rect(pageWidth - margin - 3, margin - 5, cornerSize, cornerSize, 'F');
    pdf.rect(margin - 5, pageHeight - margin - 3, cornerSize, cornerSize, 'F');
    pdf.rect(pageWidth - margin - 3, pageHeight - margin - 3, cornerSize, cornerSize, 'F');
  };

  const addStyledText = (
    text: string,
    fontSize: number = 12,
    style: 'normal' | 'bold' | 'italic' = 'normal',
    color: string = colors.dark,
    align: 'left' | 'center' | 'right' = 'left'
  ) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', style);
    pdf.setTextColor(color);

    const lines = pdf.splitTextToSize(text, contentWidth);

    if (yPosition + (lines.length * (fontSize * 0.6)) > pageHeight - margin - 50) {
      pdf.addPage();
      yPosition = margin + 10;
      addDecorativeBorder();
    }

    let xPosition = margin;
    if (align === 'center') xPosition = pageWidth / 2;
    else if (align === 'right') xPosition = pageWidth - margin;

    pdf.text(lines, xPosition, yPosition, { align });
    yPosition += lines.length * (fontSize * 0.6) + 8;
  };

  // Add decorative border
  addDecorativeBorder();

  // Header
  yPosition = margin + 15;
  addStyledText('BMI HEALTH REPORT', 24, 'bold', colors.primary, 'center');
  addStyledText('Body Mass Index Analysis', 14, 'italic', colors.gray, 'center');
  yPosition += 15;

  // BMI Result in a beautiful circular display
  const centerX = pageWidth / 2;
  const circleY = yPosition + 40;
  const circleRadius = 35;

  // Circle background
  pdf.setFillColor(colors.lightGray);
  pdf.circle(centerX, circleY, circleRadius, 'F');

  // Circle border
  pdf.setDrawColor(colors.primary);
  pdf.setLineWidth(3);
  pdf.circle(centerX, circleY, circleRadius);

  // BMI value
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text(bmiData.bmi.toString(), centerX, circleY - 5, { align: 'center' });

  // BMI label
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(colors.gray);
  pdf.text('BMI', centerX, circleY + 8, { align: 'center' });

  yPosition = circleY + circleRadius + 20;

  // Category badge
  const categoryY = yPosition;
  const badgeWidth = 120;
  const badgeHeight = 25;
  const badgeX = centerX - badgeWidth / 2;

  // Determine category color
  let categoryColor = colors.success;
  if (bmiData.category.toLowerCase().includes('underweight')) categoryColor = colors.secondary;
  else if (bmiData.category.toLowerCase().includes('overweight')) categoryColor = colors.warning;
  else if (bmiData.category.toLowerCase().includes('obese')) categoryColor = colors.error;

  pdf.setFillColor(categoryColor);
  pdf.roundedRect(badgeX, categoryY, badgeWidth, badgeHeight, 5, 5, 'F');

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.white);
  pdf.text(bmiData.category, centerX, categoryY + 16, { align: 'center' });

  yPosition += 40;

  // BMI Report Table
  yPosition += 20;

  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.primary);
  pdf.text('BMI REPORT TABLE', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 25;

  // Table structure
  const tableY = yPosition;
  const tableHeight = 120;
  const rowHeight = 20;
  const col1Width = 80;


  // Table border
  pdf.setDrawColor(colors.primary);
  pdf.setLineWidth(2);
  pdf.rect(margin, tableY, contentWidth, tableHeight);

  // Table data
  const tableData = [
    ['Measurement', 'Value'],
    ['Weight', `${bmiData.weight} ${bmiData.unit === 'metric' ? 'kg' : 'lbs'}`],
    ['Height', `${bmiData.height} ${bmiData.unit === 'metric' ? 'cm' : 'inches'}`],
    ['BMI Score', bmiData.bmi.toString()],
    ['BMI Category', bmiData.category],
    ['Healthy Weight Range', `${bmiData.healthyWeightRange.min} - ${bmiData.healthyWeightRange.max} ${bmiData.unit === 'metric' ? 'kg' : 'lbs'}`]
  ];

  // Draw table rows and content
  tableData.forEach((row, index) => {
    const rowY = tableY + (index * rowHeight);

    // Row background (alternating colors)
    if (index === 0) {
      pdf.setFillColor(colors.primary);
      pdf.rect(margin, rowY, contentWidth, rowHeight, 'F');
    } else if (index % 2 === 0) {
      pdf.setFillColor(colors.lightGray);
      pdf.rect(margin, rowY, contentWidth, rowHeight, 'F');
    }

    // Row borders
    pdf.setDrawColor(colors.primary);
    pdf.setLineWidth(1);
    pdf.line(margin, rowY, margin + contentWidth, rowY);
    pdf.line(margin + col1Width, rowY, margin + col1Width, rowY + rowHeight);

    // Text styling
    if (index === 0) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.white);
    } else {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', index === 4 ? 'bold' : 'normal');
      pdf.setTextColor(colors.dark);
    }

    // Cell content
    pdf.text(row[0], margin + 5, rowY + 13);
    pdf.text(row[1], margin + col1Width + 5, rowY + 13);
  });

  yPosition += tableHeight + 20;

  // Healthy weight range section
  const rangeBoxY = yPosition;
  pdf.setFillColor(colors.success);
  pdf.rect(margin, rangeBoxY, contentWidth, 20, 'F');

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.white);
  pdf.text('HEALTHY WEIGHT RANGE', margin + 10, rangeBoxY + 13);

  yPosition += 30;

  addStyledText(`${bmiData.healthyWeightRange.min} - ${bmiData.healthyWeightRange.max} ${bmiData.unit === 'metric' ? 'kg' : 'lbs'}`, 16, 'bold', colors.success, 'center');
  yPosition += 10;

  // Health Recommendations Section
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.secondary);
  pdf.text('HEALTH RECOMMENDATIONS', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 25;

  // Recommendations in styled boxes
  bmiData.recommendations.forEach((rec, index) => {
    const recBoxY = yPosition;
    const recBoxHeight = 25;

    // Recommendation box
    pdf.setFillColor(index % 2 === 0 ? colors.lightGray : colors.white);
    pdf.rect(margin, recBoxY, contentWidth, recBoxHeight, 'F');
    pdf.setDrawColor(colors.secondary);
    pdf.setLineWidth(1);
    pdf.rect(margin, recBoxY, contentWidth, recBoxHeight);

    // Recommendation number circle
    pdf.setFillColor(colors.secondary);
    pdf.circle(margin + 15, recBoxY + 12, 8, 'F');

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.white);
    pdf.text((index + 1).toString(), margin + 15, recBoxY + 15, { align: 'center' });

    // Recommendation text
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(colors.dark);
    const lines = pdf.splitTextToSize(rec, contentWidth - 40);
    pdf.text(lines, margin + 30, recBoxY + 10);

    yPosition += recBoxHeight + 5;
  });

  // Beautiful footer
  const footerY = pageHeight - 40;

  pdf.setFillColor(colors.dark);
  pdf.rect(0, footerY, pageWidth, 40, 'F');

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.white);
  pdf.text('Age Calculator', pageWidth / 2, footerY + 12, { align: 'center' });

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('BMI is a screening tool. Consult healthcare professionals for personalized advice.', pageWidth / 2, footerY + 22, { align: 'center' });

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(colors.gray);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()} | Developed by Md. Farhan Sadik`, pageWidth / 2, footerY + 32, { align: 'center' });

  // Download
  pdf.save('bmi_health_report.pdf');
}

/**
 * Generate beautiful health tips PDF
 */
export function generateHealthTipsPDF(tips: Array<{
  title: string;
  description: string;
  category: string;
  content: string[];
  benefits: string[];
}>): void {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper functions (reuse from previous)
  const addDecorativeBorder = () => {
    pdf.setDrawColor(colors.primary);
    pdf.setLineWidth(2);
    pdf.rect(margin - 5, margin - 5, contentWidth + 10, pageHeight - 2 * margin + 10);

    const cornerSize = 8;
    pdf.setFillColor(colors.primary);
    pdf.rect(margin - 5, margin - 5, cornerSize, cornerSize, 'F');
    pdf.rect(pageWidth - margin - 3, margin - 5, cornerSize, cornerSize, 'F');
    pdf.rect(margin - 5, pageHeight - margin - 3, cornerSize, cornerSize, 'F');
    pdf.rect(pageWidth - margin - 3, pageHeight - margin - 3, cornerSize, cornerSize, 'F');
  };

  const addStyledText = (
    text: string,
    fontSize: number = 12,
    style: 'normal' | 'bold' | 'italic' = 'normal',
    color: string = colors.dark,
    align: 'left' | 'center' | 'right' = 'left'
  ) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', style);
    pdf.setTextColor(color);

    const lines = pdf.splitTextToSize(text, contentWidth);

    if (yPosition + (lines.length * (fontSize * 0.6)) > pageHeight - margin - 50) {
      pdf.addPage();
      yPosition = margin + 10;
      addDecorativeBorder();
    }

    let xPosition = margin;
    if (align === 'center') xPosition = pageWidth / 2;
    else if (align === 'right') xPosition = pageWidth - margin;

    pdf.text(lines, xPosition, yPosition, { align });
    yPosition += lines.length * (fontSize * 0.6) + 8;
  };

  // Add decorative border
  addDecorativeBorder();

  // Header
  yPosition = margin + 15;
  addStyledText('HEALTH TIPS COLLECTION', 24, 'bold', colors.primary, 'center');
  addStyledText('Your Guide to Better Health & Wellness', 14, 'italic', colors.gray, 'center');
  yPosition += 15;

  // Category colors
  const categoryColors: { [key: string]: string } = {
    nutrition: colors.success,
    exercise: colors.secondary,
    mental_health: '#8b5cf6',
    sleep: '#06b6d4',
    hydration: '#3b82f6',
    general: colors.gray
  };

  // Tips with beautiful styling
  tips.forEach((tip, index) => {
    if (index > 0) yPosition += 10;

    // Tip header with colored background
    const tipHeaderY = yPosition;
    const categoryColor = categoryColors[tip.category] || colors.primary;

    pdf.setFillColor(categoryColor);
    pdf.rect(margin, tipHeaderY, contentWidth, 25, 'F');

    // Tip number and title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.white);
    pdf.text(`${index + 1}. ${tip.title}`, margin + 10, tipHeaderY + 16);

    // Category badge
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(tip.category.toUpperCase(), pageWidth - margin - 10, tipHeaderY + 16, { align: 'right' });

    yPosition += 35;

    // Description
    addStyledText(tip.description, 12, 'italic', colors.gray);
    yPosition += 5;

    // Implementation section
    const implY = yPosition;
    pdf.setFillColor(colors.lightGray);
    pdf.rect(margin, implY, contentWidth, 15, 'F');

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.dark);
    pdf.text('💡 How to implement:', margin + 10, implY + 10);

    yPosition += 20;

    tip.content.forEach(item => {
      addStyledText(`• ${item}`, 10, 'normal', colors.dark);
    });
    yPosition += 5;

    // Benefits section
    const benefitsY = yPosition;
    pdf.setFillColor(colors.success);
    pdf.rect(margin, benefitsY, contentWidth, 15, 'F');

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(colors.white);
    pdf.text('✅ Benefits:', margin + 10, benefitsY + 10);

    yPosition += 20;

    tip.benefits.forEach(benefit => {
      addStyledText(`• ${benefit}`, 10, 'normal', colors.dark);
    });

    yPosition += 10;
  });

  // Beautiful footer
  const footerY = pageHeight - 40;

  pdf.setFillColor(colors.dark);
  pdf.rect(0, footerY, pageWidth, 40, 'F');

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(colors.white);
  pdf.text('Age Calculator', pageWidth / 2, footerY + 12, { align: 'center' });

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('These tips are for general wellness. Consult healthcare professionals for personalized advice.', pageWidth / 2, footerY + 22, { align: 'center' });

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(colors.gray);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()} | Developed by Md. Farhan Sadik`, pageWidth / 2, footerY + 32, { align: 'center' });

  // Download
  pdf.save('health_tips_guide.pdf');
}
