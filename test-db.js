// Simple test script to verify database connection
const testDatabase = async () => {
  try {
    console.log("Testing database connection...");

    // Test fetching all courses
    const coursesResponse = await fetch("http://localhost:3000/api/courses");
    const courses = await coursesResponse.json();

    console.log("✅ Courses API working!");
    console.log(`Found ${courses.length} courses:`);
    courses.forEach((course) => {
      console.log(`- ${course.title} (${course.type})`);
    });

    // Test fetching a specific course
    if (courses.length > 0) {
      const courseId = courses[0].id;
      const courseResponse = await fetch(
        `http://localhost:3000/api/courses/${courseId}`
      );
      const courseData = await courseResponse.json();

      console.log("✅ Individual course API working!");
      console.log(`Course details for "${courseData.title}":`);
      console.log(`- Type: ${courseData.type}`);
      console.log(`- Difficulty: ${courseData.difficulty}`);
      console.log(`- Category: ${courseData.category}`);

      if (courseData.type === "slides" && courseData.slides) {
        console.log(`- Slides: ${courseData.slides.length}`);
        courseData.slides.forEach((slide, index) => {
          console.log(
            `  ${index + 1}. ${slide.title} ${
              slide.quiz ? "(with quiz)" : "(no quiz)"
            }`
          );
        });
      }
    }

    console.log("🎉 Database connection test completed successfully!");
  } catch (error) {
    console.error("❌ Database connection test failed:", error.message);
  }
};

// Run the test
testDatabase();
