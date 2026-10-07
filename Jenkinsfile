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
                    powershell -Command "$version = Get-Date -Format 'yyyyMMdd-HHmmss'; Compress-Archive -Path * -DestinationPath ('techzone-build-' + $version + '.zip') -Force"
                '''

                archiveArtifacts artifacts: 'techzone-build-*.zip',
                                 fingerprint: true
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'

                archiveArtifacts artifacts: 'coverage/lcov.info',
                                 fingerprint: true
            }
        }

        stage('Security') {
            steps {
                bat 'npm audit --json > npm-audit.json'

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

                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    if exist staging rmdir /s /q staging
                    mkdir staging
                '''

                bat '''
                    powershell -Command "Expand-Archive -Path (Get-ChildItem techzone-build-*.zip | Select-Object -First 1).FullName -DestinationPath staging -Force"
                '''

                bat '''
                    if exist staging\\node_modules rmdir /s /q staging\\node_modules
                    cd staging
                    npm ci --omit=dev
                '''

                bat '''
                    powershell -Command "$env:PORT='3001'; $p = Start-Process -FilePath 'node' -ArgumentList 'server.js' -WorkingDirectory "$env:WORKSPACE\\staging" -PassThru; $p.Id | Out-File "$env:WORKSPACE\\staging.pid" -Encoding ascii; Start-Sleep -Seconds 5; try { $response = Invoke-WebRequest -Uri 'http://localhost:3001' -UseBasicParsing -TimeoutSec 10; if ($response.StatusCode -eq 200) { Write-Host 'Staging health check passed.' } else { Write-Host 'Staging health check failed.'; exit 1 } } catch { Write-Host 'Staging health check failed: application is not responding.'; exit 1 }"
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

                withCredentials([
                    string(
                        credentialsId: 'NEW_RELIC_LICENSE_KEY',
                        variable: 'NEW_RELIC_LICENSE_KEY'
                    )
                ]) {
                    bat '''
                        powershell -Command "$env:PORT='3000'; $env:NEW_RELIC_APP_NAME='TechZone-7.3HD'; $env:NEW_RELIC_NO_CONFIG_FILE='true'; $env:JENKINS_NODE_COOKIE='techzone-production'; $p = Start-Process -FilePath 'node' -ArgumentList '-r newrelic server.js' -WorkingDirectory "$env:WORKSPACE\\production" -PassThru; $p.Id | Out-File "$env:WORKSPACE\\production.pid" -Encoding ascii; Start-Sleep -Seconds 10; try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 10; if ($response.StatusCode -eq 200) { Write-Host 'Production health check passed.' } else { Write-Host 'Production health check failed.'; exit 1 } } catch { Write-Host 'Production health check failed: application is not responding.'; exit 1 }"
                    '''
                }
            }
        }

        stage('Monitoring') {
            steps {
                bat '''
                    powershell -Command "if (!(Test-Path "$env:WORKSPACE\\production.pid")) { Write-Host 'Production PID file not found.'; exit 1 }; $processId = [int](Get-Content "$env:WORKSPACE\\production.pid"); try { $process = Get-Process -Id $processId -ErrorAction Stop; if ($process.HasExited) { Write-Host 'Production application is not running.'; exit 1 } } catch { Write-Host 'Production application is not running.'; exit 1 }; try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 10; if ($response.StatusCode -eq 200) { Write-Host 'Production monitoring check passed.' } else { Write-Host 'Production monitoring check failed.'; exit 1 } } catch { Write-Host 'Production monitoring check failed.'; exit 1 }"
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
