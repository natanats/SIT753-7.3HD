pipeline {
    agent any

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/natanats/SIT753-7.3HD.git'
            }
        }

        stage('Build') {
            steps {
                bat 'npm ci'

                bat '''
                    if exist techzone-build.zip del techzone-build.zip
                    powershell -Command "Compress-Archive -Path * -DestinationPath techzone-build.zip -Force"
                '''

                archiveArtifacts artifacts: 'techzone-build.zip',
                                 fingerprint: true
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Security') {
            steps {
                bat 'npm audit --json > npm-audit.json || exit /b 0'

                archiveArtifacts artifacts: 'npm-audit.json',
                                 fingerprint: true
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube'

                    withSonarQubeEnv('SonarCloud') {
                        bat """
                            "${scannerHome}\\bin\\sonar-scanner.bat" ^
                              -Dsonar.projectKey=natanats_SIT753-7.3HD ^
                              -Dsonar.organization=natanats ^
                              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info ^
                              -Dsonar.exclusions=coverage/** ^
                              -Dsonar.cpd.exclusions=tests/** ^
                              -Dsonar.tests=tests
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    if exist staging rmdir /s /q staging
                    mkdir staging

                    powershell -Command "Expand-Archive -Path techzone-build.zip -DestinationPath staging -Force"
                '''

                bat '''
                    if exist staging\\node_modules rmdir /s /q staging\\node_modules
                    cd staging
                    npm ci --omit=dev
                '''
            }
        }

        stage('Release') {
            steps {
                bat '''
                    if exist production rmdir /s /q production
                    mkdir production

                    xcopy staging production /E /I /Y
                '''
            }
        }

        stage('Monitoring') {
            steps {
                bat '''
                    powershell -Command "$p = Start-Process -FilePath 'node' -ArgumentList 'server.js' -WorkingDirectory "$env:WORKSPACE\\production" -PassThru; Start-Sleep -Seconds 5; try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 10; if ($response.StatusCode -eq 200) { Write-Host 'Monitoring check passed: TechZone is responding.' } else { Write-Host 'Monitoring check failed: unexpected HTTP status.'; exit 1 } } catch { Write-Host 'Monitoring check failed: TechZone is not responding.'; exit 1 } finally { Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue }"
                '''
            }
        }

        stage('Environment Check') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }
    }
}

