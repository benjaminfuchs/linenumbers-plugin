import hudson.model.Run;
import hudson.model.Result;
import hudson.model.FreeStyleProject;
import hudson.Functions;
import hudson.tasks.BatchFile;
import hudson.tasks.Shell;
import hudson.cli.CLICommandInvoker;
import org.junit.Rule;
import org.junit.Test;
import org.jvnet.hudson.test.JenkinsRule;

import com.gargoylesoftware.htmlunit.html.HtmlPage;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.MatcherAssert.assertThat;

/**
 * Tests the class {@link WarningsResult}.
 */
public class LineNumbersAnnotatorTest {
    
    @Rule public final JenkinsRule jenkinsRule = new JenkinsRule();

    @Test public void consoleShouldSuccessWithLastNLines() throws Exception {
        FreeStyleProject project = jenkinsRule.createFreeStyleProject("aProject");
        if(Functions.isWindows()) {
            project.getBuildersList().add(new BatchFile("echo wasdwasd\r\necho 2\r\necho 3\r\necho 4\r\necho 5"));
        } else {
            project.getBuildersList().add(new Shell("echo wasdwasd\necho 2\necho 3\necho 4\necho 5"));
        }
        project.scheduleBuild2(0).get();
        
        jenkinsRule.waitUntilNoActivity();
        Run run = project.getLastBuild();
        HtmlPage page = jenkinsRule.createWebClient().getPage(run,"console");
        System.out.println(page.asText());
    }
}
