require 'spec_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

describe SubmissionsController do

  # This should return the minimal set of attributes required to create a valid
  # Submission. As you add validations to Submission, be sure to
  # update the return value of this method accordingly.
  def valid_attributes
    {}
  end
  
  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # SubmissionsController. Be sure to keep this updated too.
  def valid_session
    {}
  end

  describe "GET index" do
    it "assigns all submissions as @submissions" do
      submission = Submission.create! valid_attributes
      get :index, {}, valid_session
      assigns(:submissions).should eq([submission])
    end
  end

  describe "GET show" do
    it "assigns the requested submission as @submission" do
      submission = Submission.create! valid_attributes
      get :show, {:id => submission.to_param}, valid_session
      assigns(:submission).should eq(submission)
    end
  end

  describe "GET new" do
    it "assigns a new submission as @submission" do
      get :new, {}, valid_session
      assigns(:submission).should be_a_new(Submission)
    end
  end

  describe "GET edit" do
    it "assigns the requested submission as @submission" do
      submission = Submission.create! valid_attributes
      get :edit, {:id => submission.to_param}, valid_session
      assigns(:submission).should eq(submission)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Submission" do
        expect {
          post :create, {:submission => valid_attributes}, valid_session
        }.to change(Submission, :count).by(1)
      end

      it "assigns a newly created submission as @submission" do
        post :create, {:submission => valid_attributes}, valid_session
        assigns(:submission).should be_a(Submission)
        assigns(:submission).should be_persisted
      end

      it "redirects to the created submission" do
        post :create, {:submission => valid_attributes}, valid_session
        response.should redirect_to(Submission.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved submission as @submission" do
        # Trigger the behavior that occurs when invalid params are submitted
        Submission.any_instance.stub(:save).and_return(false)
        post :create, {:submission => {}}, valid_session
        assigns(:submission).should be_a_new(Submission)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        Submission.any_instance.stub(:save).and_return(false)
        post :create, {:submission => {}}, valid_session
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested submission" do
        submission = Submission.create! valid_attributes
        # Assuming there are no other submissions in the database, this
        # specifies that the Submission created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        Submission.any_instance.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, {:id => submission.to_param, :submission => {'these' => 'params'}}, valid_session
      end

      it "assigns the requested submission as @submission" do
        submission = Submission.create! valid_attributes
        put :update, {:id => submission.to_param, :submission => valid_attributes}, valid_session
        assigns(:submission).should eq(submission)
      end

      it "redirects to the submission" do
        submission = Submission.create! valid_attributes
        put :update, {:id => submission.to_param, :submission => valid_attributes}, valid_session
        response.should redirect_to(submission)
      end
    end

    describe "with invalid params" do
      it "assigns the submission as @submission" do
        submission = Submission.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Submission.any_instance.stub(:save).and_return(false)
        put :update, {:id => submission.to_param, :submission => {}}, valid_session
        assigns(:submission).should eq(submission)
      end

      it "re-renders the 'edit' template" do
        submission = Submission.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Submission.any_instance.stub(:save).and_return(false)
        put :update, {:id => submission.to_param, :submission => {}}, valid_session
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested submission" do
      submission = Submission.create! valid_attributes
      expect {
        delete :destroy, {:id => submission.to_param}, valid_session
      }.to change(Submission, :count).by(-1)
    end

    it "redirects to the submissions list" do
      submission = Submission.create! valid_attributes
      delete :destroy, {:id => submission.to_param}, valid_session
      response.should redirect_to(submissions_url)
    end
  end

end