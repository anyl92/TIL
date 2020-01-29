package com.wgn.server.model.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class Member implements Serializable{
    
	// private static final long serialVersionUID = -3009157732242241606L; 
    @Id
    @Column(name="u_id")
	private String id;

	@Column(name = "u_nickname")
	private String nickname;

	@Column(name = "u_password")
	private String password;

    @Column(name = "u_address")
    private String address;
    
    @Column(name = "u_gender")
    private String gender;
    
    @Column(name = "u_type")
    private int type;
	
	@Column(name = "u_birth")
	private Date birth;

	protected Member() {
	}

	public Member(String id, String nickname, String password, Date birth, String address, String gender, int type) {
        super();
        this.id = id;
        this.nickname = nickname;
		this.password = password;
		this.birth = birth;
        this.address = address;
        this.gender = gender;
        this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Date getBirth() {
		return birth;
	}

	public void setBirth(Date birth) {
		this.birth = birth;
	}

    @Override
    public String toString() {
        return "Member [address=" + address + ", birth=" + birth + ", gender=" + gender + ", id=" + id + ", nickname=" + nickname
                + ", password=" + password + ", type=" + type + "]";
    }
}