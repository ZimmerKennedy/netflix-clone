/* groovylint-disable CompileStatic */
node {
    stage('SCM') {
        checkout scm
    }
    stage('SonarQube Analysis') {
        def scannerHome = tool 'SonarQube-Scanner'
        withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=notflix-pipeline -Dsonar.sources=."
        }
    }
}

/// ADDD
