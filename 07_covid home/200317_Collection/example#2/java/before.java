import java.util.Random;


public class Main
{
	private String user = "ssafy";
	private String title = "this is title";
	private String body = "this is body";
	private String image = "";
    
	public boolean post() {
	    
		if(this.user == ""){
			System.out.println("�α����� �ּ���");
			return false;
		}
		else if(this.title == ""){
			System.out.println("������ �Է��� �ּ���");
			return false;
		}
		else if(this.body == ""){
			System.out.println("������ �Է��� �ּ���");
			return false;
		}
		else if(this.image == ""){
			System.out.println("�̹����� ÷���� �ּ���");
			return false;
		}
        
		return postCore(this.user, this.title, this.body, this.image);
	}

	private boolean postCore(String user, String title, String body, String image){
    
		return true;
		//implements required
	}


	public static void main(String[] args) {
	    
		new Main().post();	   		
	}
}
