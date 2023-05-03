    //import model
    const profileController=(req,res) => {
        const user = {
            firstName: 'Kiran',
            lastName: 'Acharya',
            dob: '1995-05-12',
            gender: 'Female',
            language: 'en',
            bio: 'Passionate software engineer with experience in various programming languages.',
            educationLevel: 'master',
            major: 'Computer Science',
            finishedCourses: '20',
            graduationYear: '2022',
            emailAddress: 'kiran.acharya@example.com',
            phoneNumber: '123-456-7890',
            preferredCommunication: 'email',
            socialMedia: '@kiran_acharya',
            timeAvailability: 'Weekdays after 6pm, weekends anytime',
            currentOccupation: 'Software Engineer',
            professionalBackground: 'Computer Science',
            careerGoals: 'Become a senior software engineer and contribute to open source projects.',
            interests: 'Reading, hiking, cooking',
            learningGoals: 'Learn a new programming language, improve public speaking skills',
            softSkills: 'Communication, teamwork, time management',
            hardSkills: 'JavaScript, Python, HTML/CSS',
            img:'https://cdn-icons-png.flaticon.com/512/3917/3917705.png'
          };
          res.render("profile", {title:'profile' , user});
    }
    module.exports={profileController}
